import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  EventService,
  CreateEventComponent,
  EventRouteActivator,
  EventsResolver,
  EventDetailResolver,
  CreateEventSessionsComponent,
  SessionsComponent,
  DurationPipe,
  UpvoteComponent,
  VotingService,
  LocationValidatorDirective
} from './events';
import {EventsAppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {
  TOASTR_TOKEN,
  Toastr,
  JQ_TOKEN,
  CollapsibleWellComponent,
  SimpleModalComponent,
  ModalTriggerDirective
} from './common';
import {routes} from './routes';
import {Error404Component} from './errors/404.component';
import {AuthService} from './user/auth.service';

let toastr: Toastr = window['toastr'];
let jQuery = window['$'];

/*declare let toastr: Toastr;
declare let jQuery: object;*/
@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    NavbarComponent,
    CreateEventComponent,
    Error404Component,
    CreateEventSessionsComponent,
    SessionsComponent,
    CollapsibleWellComponent,
    SimpleModalComponent,
    ModalTriggerDirective,
    LocationValidatorDirective,
    DurationPipe,
    UpvoteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    EventService,
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    },
    {
      provide: TOASTR_TOKEN,
      useValue: toastr
    },
    EventRouteActivator,
    EventsResolver,
    EventDetailResolver,
    AuthService,
    VotingService,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }],
  bootstrap: [EventsAppComponent]
})
export class AppModule {
}

export function checkDirtyState(component: CreateEventComponent): boolean {
  return component.isDirty;
}
