import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {SessionsComponent} from './sessions.component';
import {CollapsibleWellComponent} from '../../common';
import {UpvoteComponent} from './upvote.component';
import {AuthService} from '../../user/auth.service';
import {VotingService} from './voting.service';
import {DurationPipe} from '../shared';
import {ISession} from '../shared';
import {By} from '@angular/platform-browser';
import createSpyObj = jasmine.createSpyObj;

describe('SessionsComponentIntegrated', () => {
  let fixture: ComponentFixture<SessionsComponent>,
    component: SessionsComponent,
    element: HTMLElement,
    debugEl: DebugElement;

  beforeEach(async(() => {
    /*
    or this can be written as {isAuthenticated: () => true,userModel: {username: 'John'}};
     */
    let mockAuthService = createSpyObj('mockAuthService', ['isAuthenticated']);
    let mockVotingService = {
      userHasVoted: () => true,
      hasVoted: () => true
    };

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {provide: AuthService, useValue: mockAuthService},
        {provide: VotingService, useValue: mockVotingService}
      ],
      declarations: [
        SessionsComponent,
        CollapsibleWellComponent,
        UpvoteComponent,
        DurationPipe
      ],
      schemas: []
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    debugEl = fixture.debugElement;
  });

  describe('initial display', () => {
    it('should display the correct title', () => {
      component.sessions = [
        {
          id: 3,
          name: 'session 1',
          level: 'intermediate',
          presenter: 'John',
          abstract: 'abstract',
          duration: 1,
          voters: ['tom', 'bob']
        }
      ];
      component.filterBy = 'intermediate';
      component.sortBy = 'name';
      component.eventId = 5;

      component.ngOnChanges();
      fixture.detectChanges();

      // expect(element.querySelector('[well-title]').textContent).toContain('session 1');
      expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('session 1');
    });
  });
});
