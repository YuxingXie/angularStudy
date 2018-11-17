import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-async-observable-pipe',
  template: `<div><code>observable|async</code>:
    Time: {{ time | async }}</div>`
})
export class AsyncObservablePipeComponent {
  time = new Observable(observer => {
    setInterval(() => {
      return observer.next(new Date().toString());
    }, 1000);
    }

  );
}
