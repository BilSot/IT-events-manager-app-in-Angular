import {Injectable} from '@angular/core';
import {IUserModel} from './user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class AuthService{
  userModel: IUserModel;
  constructor(private http: HttpClient) {
  }

  loginUser(userName: string, password: string): any {
    return this.http.post(
      '/api/login',
      {username: userName},
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      })
      .pipe(tap(data => {
        this.userModel = (data['user'] as IUserModel);
      }))
      .pipe(catchError(err => {
        return of(false);
      }));
  }

  logoutUser(): any{
    this.userModel = undefined;
    return this.http.post(
      '/api/logout',
      {},
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    );
  }

  isAuthenticated(): boolean{
    return !!this.userModel;
  }

  checkAuthenticationStatus(): any{
    return this.http.get('/api/currentIdentity')
      .pipe(tap(data => {
        if(data instanceof Object) {
          this.userModel = <IUserModel> data;
        }
      }));
  }

  updateProfile(firstName: string, lastName: string): any{
    this.userModel.firstName = firstName;
    this.userModel.lastName = lastName;

    return this.http.put(
      `/api/users/${this.userModel.id}`,
      {...this.userModel},
      {headers: new HttpHeaders({'Content-Type': 'application/json'})})
      .pipe(catchError(err => {
        return of(false);
      }));
  }
}
