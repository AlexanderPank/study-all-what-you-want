import {Component, ElementRef, Input, ViewChild, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {AuthService} from './_services/auth.service';
import {LoginFormComponent} from './form-login/login-form.component';
import {sharedDataService} from './_services/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles :['']
})
export class AppComponent implements OnInit {

  public showMenu = true;

  constructor(private roter: Router,
              private authSerivice: AuthService,
              private sharedData: sharedDataService
  ) {

  }

  ngOnInit() {

  }


}
