import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {EventService} from '../shared/event.service';

@Injectable()
export class EventRouteActivator implements CanActivate{
  constructor(private eventService: EventService, private router: Router) {
  }

  // tslint:disable-next-line:max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const eventExists = !!this.eventService.getEvent( +route.params.id);
    if (!eventExists){
      this.router.navigate(['/404']);
    }

    return eventExists;
  }
}
