import { Component, OnInit } from '@angular/core';
import { Hero } from 'app/entities/hero';
import { HEROES } from 'app/mock/mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes = HEROES;
  selectedHero: Hero = this.heroes[0];

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  constructor() { }

  ngOnInit() {

  }

}
