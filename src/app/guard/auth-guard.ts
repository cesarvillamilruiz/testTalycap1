import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { LoginService } from './../services/login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{
  constructor(
    private logInService: LoginService,
    private router: Router
  ){}

  canActivate(): boolean{
    let isUserLogged = this.logInService.IsUserLogged();

    if(isUserLogged){
      return true
    }

    this.router.navigate(['login']);
    return false;
  }
}
