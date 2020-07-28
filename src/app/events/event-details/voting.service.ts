import {Injectable} from '@angular/core';
import {ISession} from '../shared';

@Injectable()
export class VotingService{
  addVoter(user: string, session: ISession): void{
    session.voters.push(user);
  }

  removeVoter(user: string, session: ISession): void{
    session.voters = session.voters.filter(voter => voter !== user);
  }

  hasVoted(user: string, session: ISession): boolean{
    return session.voters.some(voter => voter === user);
  }
}
