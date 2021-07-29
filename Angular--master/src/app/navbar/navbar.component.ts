import { LoginComponent } from './../login/login.component';
import { NavbarService } from './../shared/services/navbar.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from "../shared/services/owner.service";
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router , private ownerSrevice : OwnerService , public nav: NavbarService,
  public login:LoginComponent) { }
  admin:string;
  test:boolean=false;
  value:string="admin";
  isLogged:string="false";

  ngOnInit() {
    console.log("testeerrrrr");
    console.log(this.login.isLogged);
    this.admin=localStorage.getItem("id");  
    this.isLogged=localStorage.getItem("isLogged");  
    console.log("bbbbbbbb");
    console.log(this.admin === this.value);

    if(this.admin === this.value) {
      this.test=true;
      console.log(this.test);
      console.log("aaaaaaaaaaaaa");
    
    }
    this.router.navigate(['home']);
    console.log(this.admin);
  }


  logout() {
    this.ownerSrevice.logout()
  
    this.router.navigate(['login']);
    window.location.reload();
  }

  resolve(){
    return !!localStorage.getItem("token");
  }
}
