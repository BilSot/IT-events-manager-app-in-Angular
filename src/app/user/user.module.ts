import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {userRoutes} from './user-routes';
import {UserProfileComponent} from './user-profile.component';
import {LoginFormComponent} from './login-form.component';

@NgModule({
  declarations: [UserProfileComponent, LoginFormComponent],
  imports: [CommonModule, RouterModule.forChild(userRoutes), FormsModule, ReactiveFormsModule],
  providers: []
})
export class UserModule{

}
