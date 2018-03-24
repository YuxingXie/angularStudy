import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-use-item',
  templateUrl: './use-item.component.html',
  styleUrls: ['./use-item.component.css']
})
export class UseItemComponent implements OnInit {
  @Input() name: string;
  constructor() { }

  ngOnInit() {
  }

}
