import {Injectable} from '@angular/core';
import {IEventModel, ISession} from '../shared';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class VotingService {
  constructor(private http: HttpClient) {
  }

  addVoter(eventId: number, user: string, session: ISession): void {
    session.voters.push(user);

    this.http.post(
      `/api/events/${eventId}/sessions/${session.id}/voters/${user}`,
      {
        eventId,
        voterId: user,
        sessionId: session.id
      },
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    )
      .pipe(catchError(this.handleError('addVoter')))
      .subscribe();
  }

  removeVoter(eventId: number, user: string, session: ISession): void {
    session.voters = session.voters.filter(voter => voter !== user);

    this.http.delete(
      `/api/events/${eventId}/sessions/${session.id}/voters/${user}`,
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    )
      .pipe(catchError(this.handleError('removeVoter')))
      .subscribe();
  }

  hasVoted(user: string, session: ISession): boolean {
    return session.voters.some(voter => voter === user);
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
