import {Injectable} from '@angular/core';
import { Hero } from 'app/entities/hero';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class HeroService {
  private heroesUrl = 'http://localhost:8888/api/heroes';
  private heroUrl = 'http://localhost:8888/api/hero';
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    console.log('get heroes in heroService');
    this.log('HeroService: fetched heroes');
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(heroes => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    );
  }
  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.log(`HeroService: fetched hero id=${id}`);
    // return of(HEROES.find(hero => hero.id === id));
    return this.http.get<Hero>(`${this.heroUrl}/${id}`).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>('getHero id=${id}'))
    );
  }
  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
