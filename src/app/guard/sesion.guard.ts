import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SesionGuard implements CanActivate {
  constructor(
    public userService: UserService,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.userService.isLoggedIn == "admin") {
        console.log("Soy admin");
        this.router.navigate(['dashboard-admin']);
        return false;
      }else if(this.userService.isLoggedIn == "cliente") {
        this.router.navigate(['dashboard-client'])
        console.log("cliente");
        return false;
      }else if(this.userService.isLoggedIn === null) {
        console.log("logueese");
        return true;
      }
  }
  
}
