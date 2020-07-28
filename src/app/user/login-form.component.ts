import {Component} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './login-form.component.html',
  styles: [
    `em{ float: right; color: #E05C65; padding-left: 10px;}`
  ]
})

export class LoginFormComponent{
  userName: any;
  password: any;
  mouseOverLogin = false;
  constructor(private authService: AuthService, private route: Router) {
  }

  login(formValues): void{
    this.authService.loginUser(formValues.userName, formValues.password);
    this.route.navigate(['events']);
  }

  cancel(): void{
    this.route.navigate(['events']);
  }
}
