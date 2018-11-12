import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  onOpen = (item) => {
    console.log(item);
  }
  onClose = (item) => {
    console.log(item);
  }
}
