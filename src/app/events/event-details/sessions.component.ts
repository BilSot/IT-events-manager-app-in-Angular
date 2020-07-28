import {Component, Input, OnChanges} from '@angular/core';
import {ISession} from '../shared';

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions.component.html'
})
export class SessionsComponent implements OnChanges{
  @Input() sessions: ISession[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  visibleSessions: ISession[] = [];

  ngOnChanges(): void {
    this.filterSessions(this.filterBy);
    this.sortBy === 'name' ? this.visibleSessions.sort(this.sortByNameAsc) : this.visibleSessions.sort(this.sortByVotersDesc);
  }

  filterSessions(filter: string): void{
    if(this.sessions){
      if(filter === 'all'){
        this.visibleSessions = this.sessions.map(session => session);
      }else{
        this.visibleSessions = this.sessions.filter(session => {
          return session.level.toLowerCase() === filter;
        });
      }
    }
  }

  sortByNameAsc(s1: ISession, s2: ISession): number{
    if(s1.name > s2.name){
      return 1;
    }else if(s1.name < s2.name){
      return -1;
    }
    return 0;
  }

  sortByVotersDesc(s1: ISession, s2: ISession): number{
    return s2.voters.length - s1.voters.length;
  }
}
