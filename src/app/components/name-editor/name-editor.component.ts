import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent {
  constructor() {
    this.name.valueChanges.subscribe(value => console.log(value));
  }
  name = new FormControl('');
  updateName() {
    this.name.setValue('Nancy');
  }
}
