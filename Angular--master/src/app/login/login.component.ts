import { Component, OnInit } from '@angular/core';
import { Account } from '../model/account.model';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { LoginService } from '../shared/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  account = new Account();
  loginForm: FormGroup;
  error: string = null;

  constructor(private formBuilder: FormBuilder, private router: Router,private loginService : LoginService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',  [Validators.required  , Validators.email]],
      password: ['', Validators.required ]
    });
  }

  onLogin() {
   // this.router.navigate(['activity'])

    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      response => {
        this.loginService.saveToken(response.token) ;
        this.loginService.saveId(response.id) ;
      console.log(response.Nom);
      localStorage.setItem("id", response.Nom);
        this.router.navigate(['home']);
        window.location.reload();
      },
      err => {
        console.log(err)
      });
  }

  onLoggedin(){
    console.log(this.account);
    this.router.navigate(["account"]);
  }

}
