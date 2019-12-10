import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AddElementFormComponent } from './add-element-form/add-element-form.component';
import { MainFormComponent } from './main-form/main-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    AddElementFormComponent,
    MainFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: AddElementFormComponent, data: {testTitle: 'Memorable Memory'}  }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
