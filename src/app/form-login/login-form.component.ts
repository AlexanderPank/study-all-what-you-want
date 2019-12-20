import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from  '../_services/auth.service';
import {sharedDataService} from '../_services/shared-data.service';
import {NgForm} from '@angular/forms';



@Component({
  selector: 'app-form-login',
  templateUrl: './login-form.component.html',

  styles: [``]
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



  }

  updateUrl(x:string){
    console.log( "updateUrl x = " + x);
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

  onSubmit(f:NgForm) {
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
