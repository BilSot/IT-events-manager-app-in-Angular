import { Component, OnInit } from '@angular/core';
import {AuthService} from './user/auth.service';

@Component({
  selector: 'app-root',
  template: '<app-navbar></app-navbar>' +
    '<router-outlet></router-outlet>'
})
export class EventsAppComponent implements OnInit{
  title: string;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.checkAuthenticationStatus().subscribe();
    this.title = 'angular-fundamentals';
  }
}
