import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';
import { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(public userService: UserService) {
  }

  async canActivate(route: any, state: RouterStateSnapshot) {
    const requireRole = route.routeConfig.role
    return this.userService.getUserDetails().toPromise().then(res => {
      if (res.role === requireRole || res.role === "guest") return true
      throw new Error();
    }).catch(() => {
      return false
    })
  }

}
