import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.component.html',
  styleUrls: ['./detalle-cuenta.component.css']
})
export class DetalleCuentaComponent implements OnInit {

 
  cuenta = null;
  Miemail = null;
  constructor(public clienteService: ClienteService, public userService: UserService, public toastr: ToastrService ) {}
   mi = {
    nombre: null,
    email: null,
    dui: null,
    visitas: 0,
    username: null
  }

  ngOnInit(): void {
    this.cuenta = this.userService.user.uid;
    this.Miemail = this.userService.user.email;
    this.miCuenta();
  }

  miCuenta(){
    this.clienteService.seleccionarPorUser(this.cuenta).subscribe(result => this.mi = result[0]);
  }

  baja() {
    if (confirm('¿Esta seguro de elimiar el Registro?')) {
      this.userService.deleteAccount();
      /**/
    }
  }


}
