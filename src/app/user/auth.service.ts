import {Injectable} from '@angular/core';
import {IUserModel} from './user.model';

@Injectable()
export class AuthService{
  userModel: IUserModel;

  loginUser(userName: string, password: string): any {
    this.userModel = {
      userName,
      firstName: 'Biljana',
      lastName: 'Sotirovska',
      id: 456
    };
  }

  isAuthenticated(): boolean{
    return !!this.userModel;
  }

  updateProfile(firstName: string, lastName: string): void{
    this.userModel.firstName = firstName;
    this.userModel.lastName = lastName;
  }
}
