import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crud-usuario',
  templateUrl: './crud-usuario.component.html',
  styleUrls: ['./crud-usuario.component.css']
})
export class CrudUsuarioComponent implements OnInit {

  listaUsuario = null;
  Bnombre = null;
  u = {
    uid: null,
    nombre: null,
    username: null,
    email: null,
    rol: null
  }

  cl = {
    dui: null,
    nombre: null,
    visitas: null,
    userid: null,
    username: null
  }

  constructor(public clienteService: ClienteService, public userService: UserService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  setClNull() {
    this.u = {
      uid: null,
      nombre: null,
      username: null,
      email: null,
      rol: null
    }

    this.cl = {
      dui: null,
      nombre: null,
      visitas: null,
      userid: null,
      username: null
    }
  }

  listarTodos() {
    this.userService.listarTodos().subscribe(result => this.listaUsuario = result);
  }

  seleccionar(uid) {
    this.userService.seleccionar(uid).subscribe(result => this.u = result[0]);
    this.clienteService.seleccionarPorUser(uid).subscribe(result => this.cl = result[0]);
  }

  modificacion() {

    this.userService.modificacion(this.u).subscribe(datos => {
      if (datos['resultado'] == 'OK') {

        this.clienteService.modificacion(this.cl).subscribe(datos => {
          if (datos['resultado'] == 'OK') {
            this.toastr.success('Datos modificados exitosamente', 'Modicando...', { timeOut: 2000 });
            this.listarTodos();
            this.setClNull();
          }
        });
      }
    });
  }

}
