import { Injectable } from '@angular/core';
import { Hero } from 'app/entities/hero';
import { HEROES } from 'app/mock/mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
@Injectable()
export class HeroService {

  constructor() { }
  getHeroes(): Hero[] {
    return HEROES;
  }

}
