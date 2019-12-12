import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'form-login',
  templateUrl: './login-form.component.html',

  styles: [`
    h1{margin-top: 50px; font-family: "Source Code Pro"}
    .lf-container{margin-top: 20px}
    .category-header{  font-size: 2rem;  font-family: Verdana;  font-weight: bold; font-size: 2rem; color: #1460a4; text-align: center}
    .form-control.ng-touched.ng-invalid{border: 2px solid red}
    .form-group{padding: 10px; text-align: center; }
    .fcheck{width: 290px; color: #555; height: 20px; display: inline-block; cursor: pointer}
    .fcheck:hover{color: #222}
    .alert{
      width: 290px; display: inline-block; color: #c97c7e}
  `]
})

export class LoginFormComponent implements OnInit {

  @Input() title : string = 'нет заголовка'
  @Input() countElement:number = 0
  @Input() description : string = 'нет описания'

  page : string ='';
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';

  constructor(private aRouter : ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService
  ) {

  }

  ngOnInit() {
    this.title = this.aRouter.snapshot.params['isRegister']
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


    if (this.title == 'enter'){
      this.title = "Авторизация"
      this.page = 'enter'
    }
    else {
      this.title = "Регистрация"
      this.page = 'register'
    }

  }

  // простой геттер для доступа к полям формы
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(["/"]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
