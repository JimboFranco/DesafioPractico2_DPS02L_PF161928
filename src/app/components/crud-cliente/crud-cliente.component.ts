import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crud-cliente',
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.css']
})
export class CrudClienteComponent implements OnInit {

  listaClientes = null;
  Bnombre: string;
  cl = {
    dui: null,
    nombre: null,
    visitas: null,
    userid: null,
    username: null
  }
  uidCl = '';

  constructor(public clienteService: ClienteService, public userService: UserService, public toastr: ToastrService ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  setClNull(){
    this.cl = {
      dui: null,
      nombre: null,
      visitas: null,
      userid: null,
      username: null
    }
  
  }
  /*filtrarTabla(nombre){
    if(nombre != ""){
      this.clienteService.filterbyname(nombre).subscribe(result => this.listaClientes = result);
    }else{
      this.listarTodos();
    }
    
  }*/
  listarTodos() {
    this.clienteService.listarTodos().subscribe(result => this.listaClientes = result);
  }

  seleccionar(dui) {
    this.clienteService.seleccionar(dui).subscribe(result => this.cl = result[0]);
  }

  modificacion() {
    this.clienteService.modificacion(this.cl).subscribe(datos => {
      if (datos['resultado'] == 'OK') {
        this.toastr.success('Datos modificados exitosamente','Modicando...', {timeOut: 1000});
        this.listarTodos();
        this.setClNull();
      }
    });
  }

}
