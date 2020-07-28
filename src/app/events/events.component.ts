import {Component, OnInit} from '@angular/core';
import {EventService} from './shared/event.service';
import {ActivatedRoute} from '@angular/router';
import {IEventModel} from './shared';

@Component({
  template: `
    <div>
      <h1>Upcoming Angular 2 Events</h1>
      <hr/>
      <div class="col-md-5" *ngFor="let event of events">
        <app-event-thumbnail [event]="event"></app-event-thumbnail>
      </div>
      <!--(eventClick)="handleOnClickOnParent($event)"-->
      <!--    <button type="button" class="btn btn-primary" (click)="thumbnail.testMethod()">Log me</button>-->
    </div>
  `
})
export class EventsListComponent implements OnInit{
  events: IEventModel[];

  constructor(private eventService: EventService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.events = this.route.snapshot.data.events;
  }

  /*showEventsName(name): void{
    this.toastrService.success(name);
  }*/

  /*handleOnClickOnParent(data){
    console.log(data);
  }*/
}
