import {Component, OnInit} from '@angular/core';
import {AuthService} from '../user/auth.service';
import {ISession, IEventModel} from '../events/shared';
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
export class NavbarComponent implements OnInit{
  searchTerm: string = '';
  foundSessions: ISession[] = [];
  events: IEventModel[] = [];
  constructor(public authService: AuthService, private eventService: EventService) {
  }

  searchSessions(searchTerm): void{
    this.eventService.searchTerm(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
      // console.log(sessions);
    });
  }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(res => {
      console.log(res);
      this.events = res;
    });
    // populate this.events
  }
}
