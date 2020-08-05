import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {EventService} from './shared/event.service';

@Injectable()
export class EventDetailResolver implements Resolve<any>{
  constructor(private eventService: EventService) {
  }
  resolve(route: ActivatedRouteSnapshot): any {
    return this.eventService.getEvent(route.params.id);
  }

}
