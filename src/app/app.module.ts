import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';

/**
 * angular结构是module包含component，component之间可以互相耦合，
 * 比如app.component.html可以使用<app-hello-world></app-hello-world>,
 * 从类的角度看，AppComponent类的实例中使用了HelloWorldComponent实例，是use-a关系
 */
@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
