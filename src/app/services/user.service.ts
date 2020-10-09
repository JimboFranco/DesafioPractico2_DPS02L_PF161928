import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../models/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
// toastr
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData: any; // Guardar datos de usuario registrados
  public uid: string;//DE MOMENTO NO SE USA
  user = {
    uid: null,
    email: null,
    username: null,
    rol: null,
    verificado: null
  }

  cl = {
    dui: null,
    nombre: null,
    visitas: null,
    userid: null
  }

  urlUser = 'https://desafio2dps02l.000webhostapp.com/backend/usuario/'; // disponer url de su servidor que tiene las páginas PHP
  urlClient = 'https://desafio2dps02l.000webhostapp.com/backend/clientes/'; // disponer url de su servidor que tiene las páginas PHP
  //urlUser = 'http://127.0.0.1/Desafio2DPS/usuario/'; // disponer url de su servidor que tiene las páginas PHP
  //urlClient = 'http://127.0.0.1/Desafio2DPS/clientes/'; // disponer url de su servidor que tiene las páginas PHP
  constructor(
    private http: HttpClient,
    public afs: AngularFirestore,   //  Inyectar Servicio Firestore
    public afAuth: AngularFireAuth, // Inyectar el servicio de autenticación de Firebase
    public router: Router,
    public ngZone: NgZone,// Servicio NgZone para eliminar la advertencia de alcance externo
    public toastr: ToastrService
  ) {
    /* Guardar datos de usuario en almacenamiento local cuando
  iniciado sesión y configurando nulo al cerrar sesión*/
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        
        this.setUsernull();
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  listarTodos() {
    return this.http.get(`${this.urlUser}recuperartodos.php`);
  }
  seleccionar(uid: string) {
    return this.http.get(`${this.urlUser}seleccionar.php?uid=${uid}`);
  }
 
  login(username: string) {
    return this.http.get(`${this.urlUser}login.php?username='${username}'`);
  }

  loginGoogle(username: string) {
    this.http.get(`${this.urlUser}logingoogle.php?email=${username}`).subscribe(result => this.user = result[0]);
  }

  baja(uid: number) {
    return this.http.get(`${this.urlUser}baja.php?uid=${uid}`);
  }
  altaUser(articulo) {
    return this.http.post(`${this.urlUser}alta.php`, JSON.stringify(articulo));
  }

  modificacion(articulo) {
    return this.http.post(`${this.urlUser}modificacion.php`, JSON.stringify(articulo));
  }

  altaClient(articulo) {
    return this.http.post(`${this.urlClient}alta.php`, JSON.stringify(articulo));
  }

  setUsernull() {
    this.user = { uid: null, email: null, username: null, rol: null, verificado: null }
    this.cl = {dui: null, nombre: null, visitas: null, userid: null }
  }

  //FIREBASE AUTH
  escribirUsername(username){
    this.login(username).subscribe(result => {
      
      this.user = result[0];
    });

    alert(this.user);
  }

  //Registrarse
  SignUp(dui, name, username, email, password) {
    this.user = { uid:null, email: email, username: username, rol: "cliente", verificado: true }
    this.cl = {dui: dui, nombre: name, visitas: 0, userid: null}

    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        //this.SendVerificationMail();
        this.SetUserData(result.user, 1);
        this.router.navigate(['dashboard-admin']);
      }).catch((error) => {
        this.toastr.error("Fallo el registro: " + error.message)
      })

  }

  //Login
  SignIn(username, password) {


    if (this.user.email != null){
      return this.afAuth.signInWithEmailAndPassword(this.user.email, password).then((result) => {
        this.ngZone.run(() => {
          this.user.uid = result.user.uid.toString();
          this.router.navigate(['dashboard-admin']);
        });
        this.SetUserData(result.user, 0);
      }).catch((error) => {
        // window.alert("Por favor revisar credenciales")
        this.toastr.warning("Fallo el login: " + error.message)
      })
    }else{
      this.toastr.warning("Este usuario no existe!");
    }
    
  }


  deleteAccount(){
    this.baja(this.user.uid).subscribe(datos => {
      if (datos['resultado'] == 'OK') {
        this.toastr.warning('Cuenta eliminada definitivamente!')
      }
    });
  }

    // Iniciar sesión usando Facebook Google
    GoogleAuth() {
      return this.AuthLogin(new auth.GoogleAuthProvider());
    }

      // Lógica de autenticación para ejecutar cualquier proveedor de autenticación  
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider).then((result) => {
       this.ngZone.run(() => {
        this.uid = result.user.uid.toString();
          this.router.navigate(['dashboard-admin']);
        })
        this.SetUserData(result.user, 2);
    }).catch((error) => {
      this.toastr.error(error.message)
    })
  }


   // desconectar
   SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.setItem('user', null);
      localStorage.removeItem('user');
      this.setUsernull();
      this.router.navigate(['sign-in']);
    })
  }

  get isLoggedIn(): string {
   // window.alert("El usuario logueado es: " + this.user.rol);
   if(this.user.uid != null ){
    return this.user.rol;
  }
    return null;
  }

  // Restablecer contraseña olvidada
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      this.toastr.info('Reinicio de contraseña enviado, revisa tu correo :D.');
      this.router.navigate(['sign-in']);
    }).catch((error) => {
      this.toastr.error(error.message)
    })
  }

  // Enviar verificación por correo electrónico cuando se registre un nuevo usuario

  /* Configurar datos de usuario al iniciar sesión con nombre de usuario / contraseña,
registrarse con nombre de usuario / contraseña e iniciar sesión con autenticación social
proveedor en la base de datos de Firestore usando el servicio AngularFirestore + AngularFirestoreDocument*/
  SetUserData(user, first) {
    if (first == 1) {
      this.user.uid = user.uid;
      this.cl.userid = user.uid;


      this.altaUser(this.user).subscribe(datos => {
        if (datos['resultado'] == 'OK') {
         // alert(datos['mensaje']);
        }
      });

      this.cl.userid = user.uid;
      this.altaClient(this.cl).subscribe(datos => {
        if (datos['resultado'] == 'OK') {
          //alert(datos['mensaje']);
        }
      });
    }

    if(first == 2){
      this.loginGoogle(user.email);
      if(this.user.email == null){
        this.user = {
          uid: user.uid,
          email: user.email,
          username: user.email,
          rol: "cliente",
          verificado: true
        }
      
        this.cl = {
          dui: "Google Account",
          nombre: user.displayName,
          visitas: 0,
          userid: user.uid
        }

        this.altaUser(this.user).subscribe(datos => {
          if (datos['resultado'] == 'OK') {
           // alert(datos['mensaje']);
          }
        });
  
  
        this.cl.userid = user.uid;
        this.altaClient(this.cl).subscribe(datos => {
          if (datos['resultado'] == 'OK') {
            //alert(datos['mensaje']);
          }
        });
      }
    }

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      username: this.user.username,
      role: this.user.rol,
      emailVerified: true
    }
    this.toastr.success('Bienvenido', this.cl.nombre,  { timeOut: 1000 });
    return userRef.set(userData, {
      merge: true
    })
  }
}
