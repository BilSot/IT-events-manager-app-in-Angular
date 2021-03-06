import {Routes} from '@angular/router';
import {Error404Component} from './errors/404.component';
import {
  EventsListComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventsResolver,
  CreateEventSessionsComponent,
  EventDetailResolver
} from './events';

export const routes: Routes = [
  {path: 'events', component: EventsListComponent, resolve: {events: EventsResolver}},
  {path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']},
  {path: 'events/:id', component: EventDetailsComponent, resolve: {event: EventDetailResolver}},
  {path: 'events/sessions/new', component: CreateEventSessionsComponent},
  {path: '404', component: Error404Component},
  {path: '', redirectTo: '/events', pathMatch: 'full'},
  {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)}
];
