import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from  '../_services/auth.service';
import {sharedDataService} from '../_services/shared-data.service';
import {isDefined} from '@angular/compiler/src/util';


@Component({
  selector: 'form-login',
  templateUrl: './login-form.component.html',

  styles: [`
    h1{margin-top: 20px; font-family: "Source Code Pro"}
    .lf-container{margin-top: 20px}
    .category-header{  font-size: 2rem;  font-family: Verdana;  font-weight: bold; font-size: 2rem; color: #1460a4; text-align: center}
    .form-control.ng-touched.ng-invalid{border: 2px solid red}
    .form-group{padding: 10px; text-align: center; }
    .fcheck{width: 290px; color: #555; height: 20px; display: inline-block; cursor: pointer}
    .fcheck:hover{color: #222}
    .alert{
      display: inline-block; color:  crimson;
      padding: 10px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    .btn-ok{ width: 150px ; }
    .loading{
      display: block;
      position: fixed;
      top: 150px;
      max-width: 330px;
      padding: 15px;
      min-height: 100px;
      margin: auto;
      left: 0;
      right: 0;
    }

    .loadingForm {
      background: #fff;
      border-radius: 5px;
      box-shadow: 4px 4px 5px #ccc;

    }

    a{
      color: #6996d2;
      cursor: pointer;
      text-decoration: underline;
      text-decoration: underline;
      font-size: 18px;
    }
    a:hover{
      color: #1976d2;
    }
  `]
})

export class LoginFormComponent implements OnInit {

  page : string ='';

  submitted = false;
  loading = false;
  error = '';

  login = '';
  password = '';
  email = '';



  constructor(private aRouter : ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private shaderData: sharedDataService
  ) {

     this.shaderData.data.subscribe(data => this.page =  data)

  }

  updateUrl(x:string){
    console.log(x);
    if (x == 'enter'){

      this.page = 'enter'

    }
    else {

      this.page = 'register'
    }

    this.router.navigate(['/login/' + this.page])
  }

  ngOnInit() {
    this.updateUrl(this.aRouter.snapshot.params['isRegister']);
  }

  // простой геттер для доступа к полям формы
  get f() {
    return '';
    //return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    //if (this.loginForm.invalid) {   return;    }
    this.loading = true;
    if (this.email=='')
      this.authService.login(this.login, this.password)
    else
      this.authService.register(this.login, this.password, this.email)
  }
}
