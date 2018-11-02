import {Component, Injectable} from '@angular/core';
import { Hero } from 'app/entities/hero';
import { HEROES } from 'app/mock/mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  constructor(private messageService: MessageService) { }
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    console.log('get heroes in heroService')
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

}
