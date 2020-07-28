import { Component, OnInit } from '@angular/core';
import {EventService} from '../shared/event.service';
import {ActivatedRoute, Params} from '@angular/router';
import {IEventModel, ISession} from '../shared';

@Component({
  templateUrl: './event-details.component.html',
  styles: [
    `.event-image {height: 100px;}
      .container {padding-left: 20px; padding-right: 20px;}
      a {cursor: pointer;}
      .add--session{float: right; right: 110px;}
    `
  ]
})
export class EventDetailsComponent implements OnInit{
  event: IEventModel;
  addSessionMode:boolean = false;
  filterBy: string = 'all';
  sortBy: string = 'name';
  constructor(private eventService: EventService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.event = this.eventService.getEvent( +params.id);
      this.addSessionMode = false;
    });
    // this.event = this.eventService.getEvent( +this.route.snapshot.params.id);
  }

  addSession(): void{
    this.addSessionMode = true;
  }

  saveSession(session: ISession): void{
    const maxSessionId = Math.max.apply(null,  this.event.sessions.map(s => s.id));
    session.id = maxSessionId + 1;
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event);
    this.addSessionMode = false;
  }

  cancelNewSession(): void{
    this.addSessionMode = false;
  }
}
