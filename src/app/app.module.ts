import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';

import { MainComponent } from './screens/main.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

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
import {AuthService} from "./_services/auth.service";
import {TokenInterceptor} from "./_interceptors/token.interceptor";
import {ItemListComponent} from "./screens/item-list.component";
import { FormDefinitionComponent } from './form-definition/form-definition.component';
import {DefinitionDetailsComponent} from './screens/definition-details.component';
import {AuthGuardService} from "./_services/auth-guard.service";

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
    CategoryListComponent,
    ItemListComponent,
    FormDefinitionComponent,
    DefinitionDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent},
      { path: 'categories', component: CategoryListComponent, canActivate:[AuthGuardService]},
      { path: 'items/:categoryId', component: ItemListComponent, canActivate:[AuthGuardService]},
      { path: 'items/:categoryId/:stateForm/:id', component: FormDefinitionComponent, canActivate:[AuthGuardService]},
      { path: 'category/view/:id', component: CategoryDetailsComponent, canActivate:[AuthGuardService]},
      { path: 'exam/:categoryId', component: ExaminationFormComponent , canActivate:[AuthGuardService]},
      { path: 'login/:isRegister', component: LoginFormComponent },
      { path: 'category/:stateForm/:id', component: CategoryFormComponent , canActivate:[AuthGuardService]},
      { path: '**', redirectTo : ''  },

    ]),
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuardService, AuthService,  CategoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
