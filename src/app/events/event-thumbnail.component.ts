import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IEventModel} from './shared';

@Component({
  selector: 'app-event-thumbnail',
  template: `
    <div class="well hoverwell thumbnail" [routerLink]="['/events', event.id]">
    <h2>{{event.name}}</h2>
    <div>Date: {{event.date | date:'dd/MM/yyyy'}}</div>
    <div>Time: {{event.time}}</div>
    <div>Price: {{event.price | currency:'EUR'}}</div>
    <div>
      <span>Location: {{event.location.address}}</span>
      <span class="pad-left">{{event.location.city}}, {{event.location.country}}</span>
    </div>
<!--      <button type="button" class="btn btn-primary" (click)="handleClickOnThumb()" >Click me</button>-->
  </div>
  `,
  styles: [
    ` .thumbnail{min-height: 210px;}
      .pad-left{margin-left: 10px;}
      .well div{color: #bbb;}
    `
  ]
})
export class EventThumbnailComponent {
  @Input() event: IEventModel;
  @Output() eventClick = new EventEmitter();

  // tslint:disable-next-line:typedef
  testMethod(){
    console.log('Hello from testMethod');
  }
  /*handleClickOnThumb(){
    this.eventClick.emit(this.event.name);
  }*/
}
