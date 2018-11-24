import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-zippy',
  template: `
    <div class="zippy">
      <div (click)="toggle()">Toggle</div>
      <div [hidden]="!visible">
        Can you see me?
        <ng-content></ng-content>
      </div>
    </div>`})

export class ZippyComponent {
  visible = true;
  @Output() open = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();

  toggle() {
    this.visible = !this.visible;
    if (this.visible) {
      this.open.emit('visible');
    } else {
      this.close.emit('invisible');
    }
  }
}
