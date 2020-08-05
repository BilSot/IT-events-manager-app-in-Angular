import {SessionsComponent} from './sessions.component';
import {ISession} from '../shared';

describe('SessionsComponent', () => {
  let sessionsComponent: SessionsComponent;
  let mockAuthService: any;
  let mockVotingService: any;

  beforeEach(() => {
    sessionsComponent = new SessionsComponent(mockAuthService, mockVotingService);
  });

  describe('ngOnChanges', () => {
    it('should filter sessions correctly', () => {
      sessionsComponent.sessions = <ISession[]> [
        {name: 'a', level: 'intermediate'},
        {name: 'b', level: 'beginner'},
        {name: 'c', level: 'beginner'},
        {name: 'd', level: 'advanced'}
      ];
      sessionsComponent.filterBy = 'intermediate';
      sessionsComponent.sortBy = 'voters';
      sessionsComponent.filterSessions();
      expect(sessionsComponent.visibleSessions.length).toBe(1);
      expect(sessionsComponent.visibleSessions[0].name).toBe('a');
    });

    /*it('should sort sessions correctly', () => {

    });*/
  });
});
