import {VotingService} from './events/event-details';
import {ISession} from './events/shared';
import {of} from 'rxjs';

describe('Voter service', () => {
  let voterService: VotingService,
    mockHttp: any;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['post', 'delete']);
    voterService = new VotingService(mockHttp);
  });

  describe('removeVoter', () => {
    it('should remove voter', () => {
      const session = <ISession> {id: 3, voters: ['joe', 'john']};
      mockHttp.delete.and.returnValue(of(false));
      voterService.removeVoter(5, 'joe', session);

      expect(session.voters.length).toBe(1);
      expect(session.voters[0]).toBe('john');
      expect(mockHttp.delete).toHaveBeenCalledWith(
        '/api/events/5/sessions/3/voters/joe',
        jasmine.any(Object));
    });
  });

  describe('addVoter', () => {
    it('should add voter', () => {
      const session = <ISession> {id: 3, voters: ['john']};
      mockHttp.post.and.returnValue(of(false));
      voterService.addVoter(5, 'joe', session);

      expect(session.voters.length).toBe(2);
      expect(mockHttp.post).toHaveBeenCalledWith(
        '/api/events/5/sessions/3/voters/joe',
        {
          eventId: 5,
          voterId: 'joe',
          sessionId: 3
        },
        jasmine.any(Object));
    });
  });

});
