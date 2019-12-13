import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';

import { MainFormComponent } from './main-form/main-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ExaminationFormComponent } from './examination-form/examination-form.component';
import { CardComponent } from './elements/card.component';
import { MainMenuItemComponent} from './elements/main-menu-item.component';
import { LoginFormComponent} from './forms/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,

    MainFormComponent,
    ExaminationFormComponent,
    CardComponent,
    MainMenuItemComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: MainFormComponent, data: {testTitle: 'Memorable Memory'}  },
      { path: 'exam/:categoryId', component: ExaminationFormComponent, data: {testTitle: '<< Назад'}  },
      { path: 'login/:isRegister', component: LoginFormComponent, data: {testTitle: 'Memorable Memory'}  }
    ]),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
