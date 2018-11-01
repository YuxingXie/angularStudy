import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './components/app/app.component';
import { HelloWorldComponent } from './components/hello-world/hello-world.component';
import { UseItemComponent } from './components/use-item/use-item.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { TestComponentComponent } from './components/test-component/test-component.component';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    UseItemComponent,
    UserListComponent,
    HeroesComponent,
    TestComponentComponent,
    HeroDetailComponent
  ],
  imports: [
    FormsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
