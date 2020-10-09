import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'https://desafio2dps02l.000webhostapp.com/backend/clientes/'; // disponer url de su servidor que tiene las páginas PHP
  constructor(private http: HttpClient) { }

  listarTodos() {
    return this.http.get(`${this.url}recuperartodos.php`);
  }
  modificacion(articulo) {
    return this.http.post(`${this.url}modificacion.php`, JSON.stringify(articulo));
  }
  seleccionar(dui: string) {
    return this.http.get(`${this.url}seleccionar.php?dui='${dui}'`);
  }
  /*filterbyname(nombre: string) {
    return this.http.get(`${this.url}filterbyname.php?nombre='${nombre}%'`);
  }*/
  seleccionarPorUser(uid: string) {
    return this.http.get(`${this.url}seleccionarporuser.php?uid='${uid}'`);
  }
}
