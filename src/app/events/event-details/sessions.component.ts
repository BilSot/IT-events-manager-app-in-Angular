import {Component, Input, OnChanges} from '@angular/core';
import {ISession} from '../shared';
import {VotingService} from './voting.service';
import {AuthService} from '../../user/auth.service';

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions.component.html'
})
export class SessionsComponent implements OnChanges {
  @Input() eventId: number;
  @Input() sessions: ISession[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  visibleSessions: ISession[] = [];

  constructor(public auth: AuthService, private voteService: VotingService) {
  }

  ngOnChanges(): void {
    this.filterSessions();
    this.sortSessions();
  }

  sortSessions(): void {
    this.sortBy === 'name' ? this.visibleSessions.sort(this.sortByNameAsc) : this.visibleSessions.sort(this.sortByVotersDesc);
  }

  filterSessions(): void {
    if (this.sessions) {
      if (this.filterBy === 'all') {
        this.visibleSessions = [...this.sessions]; // this.sessions.map(session => session);
      } else {
        this.visibleSessions = this.sessions.filter(session => {
          return session.level.toLowerCase() === this.filterBy;
        });
      }
    }
  }

  sortByNameAsc(s1: ISession, s2: ISession): number {
    if (s1.name > s2.name) {
      return 1;
    } else if (s1.name < s2.name) {
      return -1;
    }
    return 0;
  }

  sortByVotersDesc(s1: ISession, s2: ISession): number {
    return s2.voters.length - s1.voters.length;
  }

  toggleVote(session: ISession): void {
    if (!this.userHasVoted(session)) {
      this.voteService.addVoter(this.eventId, this.auth.userModel.userName, session);
    }else{
      this.voteService.removeVoter(this.eventId, this.auth.userModel.userName, session);
    }

    if(this.sortBy === 'voters'){
      this.visibleSessions.sort(this.sortByVotersDesc);
    }
  }

  userHasVoted(session: ISession): boolean {
    return this.voteService.hasVoted(this.auth.userModel.userName, session);
  }
}
