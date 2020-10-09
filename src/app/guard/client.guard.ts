import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {

  constructor(
    public userService: UserService,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.userService.isLoggedIn == "cliente") {
        console.log("Bienve");
        return true;
      }else if(this.userService.isLoggedIn === "admin") {
        this.router.navigate(['dashboard-admin']);
        console.log("admin");
        return false;
      }else if(this.userService.isLoggedIn === null) {
        console.log("logueese");
        this.router.navigate(['sign-in'])
        return true;
      }
  }
  
}
