import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IEventModel, ISession} from './event.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable()
export class EventService {
  constructor(private http: HttpClient) {
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getEvents(): Observable<IEventModel[]> {
    return this.http.get('/api/events')
      .pipe(catchError(this.handleError<IEventModel[]>('getEvents', [])));
  }

  getEvent(id: number): Observable<IEventModel> {
    return this.http.get('/api/events/' + id)
      .pipe(catchError(this.handleError<IEventModel>('getEvent')));
  }

  saveEvent(eventData): Observable<IEventModel> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<IEventModel>('/api/events', eventData, options)
      .pipe(catchError(this.handleError<IEventModel>('saveEvent')));
  }

  searchTerm(term: string): Observable<ISession[]> {
    const searchTerm = term.toLowerCase();
    return this.http.get<ISession[]>('/api/sessions/search?search=' + searchTerm)
      .pipe(catchError(this.handleError<ISession[]>('searchTerm')));
  }
}
