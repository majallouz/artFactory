import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token : string = null ;
  id : number = null
  allAccounts : Account[];
  list : Account[];
  constructor(private http : HttpClient) { }

  login(email : string , password : string ) : Observable<any>{
    let data = {
      email : email ,
      password : password
    };
    return this.http.post<any>("http://localhost:8000/account/login/" , data );
  }

  saveToken( token ) {
    this.token = token ;
    localStorage.setItem("token", token);
  }

  saveId( id ) {
    this.id = id ;
    localStorage.setItem("id", id);
  }
   

}
