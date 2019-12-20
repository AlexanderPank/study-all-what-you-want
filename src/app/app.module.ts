import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';

import { MainComponent } from './screens/main.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ExaminationFormComponent } from './examination-form/examination-form.component';
import { CategoryDetailsComponent } from './screens/category-details.component';
import { MainMenuItemComponent} from './elements/main-menu-item.component';
import { LoginFormComponent} from './form-login/login-form.component';
import { CategoryFormComponent } from './form-category/category-form.component';
import { ViewDefinitionComponent } from './view-definition/view-definition.component';
import { LongPressDirective } from './_directives/long-press.directive';
import {CategoryService} from './_services/categorys.service';
import {CategoryListComponent} from './screens/category-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BottomBarComponent,

    MainComponent,
    ExaminationFormComponent,
    CategoryDetailsComponent,
    MainMenuItemComponent,
    LoginFormComponent,
    CategoryFormComponent,
    ViewDefinitionComponent,
    LongPressDirective,
    CategoryListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent},
      { path: 'categories', component: CategoryListComponent},
      { path: 'category/view/:id', component: CategoryDetailsComponent},
      { path: 'exam/:categoryId', component: ExaminationFormComponent },
      { path: 'login/:isRegister', component: LoginFormComponent},
      { path: 'category/:stateForm/:id', component: CategoryFormComponent }
    ]),
    HttpClientModule,
    FormsModule
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
