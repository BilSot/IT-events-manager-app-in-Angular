import {Component} from '@angular/core';
import {AuthService} from '../user/auth.service';
import {ISession} from '../events/shared';
import {EventService} from '../events/shared';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    `
      .nav.navbar-nav {font-size: 15px;}
      #searchForm {margin-right: 100px;}
      li > a.active {color: #F97924;}

      @media (max-width: 1200px) {
        #searchForm {
          display: none;
        }
      }
    `
  ]
})
export class NavbarComponent {
  searchTerm: string = '';
  foundSessions: ISession[] = [];
  constructor(public authService: AuthService, private eventService: EventService) {
  }

  searchSessions(searchTerm): void{
    this.eventService.searchTerm(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
      // console.log(sessions);
    });
  }
}
