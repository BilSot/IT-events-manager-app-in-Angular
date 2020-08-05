import {Component, OnInit, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {TOASTR_TOKEN, Toastr} from '../common/toastr.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './user-profile.component.html',
  styles: [
    `em {float: right; color: #E05C65; padding-left: 10px;}
    .error input {background-color: #E3C3C5;}
    .error ::-webkit-input-placeholder {color: #999;}
    .error ::-moz-placeholder {color: #999;}
    .error :-moz-placeholder {color: #999;}
    .error :-ms-input-placeholder {color: #999;}`
  ]
})
export class UserProfileComponent implements OnInit{
  private firstName: FormControl;
  private lastName: FormControl;
  profileForm: FormGroup;
  constructor(private authService: AuthService, private route: Router, @Inject(TOASTR_TOKEN) private toastr: Toastr) {
  }

  ngOnInit(): void {
    this.firstName = new FormControl(this.authService.userModel.firstName, [Validators.required, Validators.pattern('^[a-zA-Z].*')]);
    this.lastName = new FormControl(this.authService.userModel.lastName, [Validators.required,  Validators.pattern('^[a-zA-Z].*')]);
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  logoutUser(): void{
    this.authService.logoutUser().subscribe(() => {
      this.route.navigate(['user/login']);
    });
  }

  updateProfile(profileFormValue): void{
    if (this.profileForm.valid) {
      this.authService.updateProfile(profileFormValue.firstName, profileFormValue.lastName).subscribe(res => {
        if(!res){
          return;
        }else{
          this.toastr.success('Profile updated');
        }
      });
      // this.route.navigate(['events']);
    }
  }

  cancel(): void{
    this.route.navigate(['events']);
  }

  isControlValid(controlName): boolean{
    return this[controlName].valid || this[controlName].untouched;
  }

}
