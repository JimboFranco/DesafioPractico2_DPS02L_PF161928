import { Component } from '@angular/core';
import { UserService } from './services/user.service';
// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Desafio2DPS02L';
  constructor( public userService: UserService, public toastr: ToastrService ) { }
}
