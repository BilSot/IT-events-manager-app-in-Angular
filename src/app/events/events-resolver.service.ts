import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {EventService} from './shared/event.service';
import {map} from 'rxjs/operators';

@Injectable()
export class EventsResolver implements Resolve<any>{
  constructor(private eventService: EventService) {
  }
  resolve(): any {
    return this.eventService.getEvents().pipe(map(events => events));
  }

}
