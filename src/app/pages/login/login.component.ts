import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthUser } from './../../Interfaces/AuthUser';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    User: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required)
  });


  constructor(
    private logInService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let response;
    //console.log(`user: ${this.loginForm.value.User} \npass: ${this.loginForm.value.Password}`);
    const auth: AuthUser = { User: this.loginForm.value.User, Password: this.loginForm.value.Password };
    this.logInService.LogIn(auth)
      .subscribe(
        res => {
          response = res;
          sessionStorage.setItem('userLogged', JSON.stringify(response));
          sessionStorage.setItem('token', JSON.stringify(response.token));
          this.router.navigate(['modules']);
        }
      );
  }

}
