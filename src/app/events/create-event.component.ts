import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {EventService} from './shared';
import {IEventModel} from './shared';

@Component({
  templateUrl: './create-event.component.html',
  styles: [
    `em {float: right; color: #E05C65; padding-left: 10px;}
    .error input {background-color: #E3C3C5;}
    .error ::-webkit-input-placeholder {color: #999;}
    .error ::-moz-placeholder {color: #999;}
    .error :-moz-placeholder {color: #999;}
    .error :-ms-input-placeholder {color: #999;}`
  ]
})
export class CreateEventComponent {
  newEvent: IEventModel;
  name: string;
  date: Date;
  time: string;
  price: number;
  address: string;
  city: string;
  country: string;
  onlineUrl: string;
  imageUrl: string;
  isDirty = true;
  constructor(private router: Router, private eventService: EventService) {
  }

  saveEvent(formValues): void{
    // console.log(this.onlineUrl, this.name, this.country);
    this.newEvent = {
      id: 100,
      name: formValues.name,
      date: formValues.date,
      time: formValues.time,
      price: formValues.price,
      imageUrl: formValues.imageUrl,
      location: {
        address: formValues.address || '',
        city: formValues.city || '',
        country: formValues.country || ''
      },
      onlineUrl: formValues.onlineUrl,
      sessions: []
    };
    this.eventService.saveEvent(this.newEvent);
    this.router.navigate(['events']);
  }

  cancel(): void{
    this.router.navigate(['/events']);
  }
}
