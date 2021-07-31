import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Account } from 'src/app/model/account.model';



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http : HttpClient) { }

   getAccounts() : Observable<any[]>{
     return this.http.get<any[]>('http://127.0.0.1:8000/account/getAll/' );
  }

  postAccount(account : any ) : Observable<any>{
    return this.http.post<any>('http://localhost:8000/account/add/'  , account  );
  }

  deleteAccount(id : number ) {
    return this.http.delete('http://localhost:8000/account/delete/'+id  );
  }

  putAccount(id : number, account: any) {
    return this.http.put('http://localhost:8000/account/update/' +id  , account );
  }

  getAccount(id : number): Observable<Account[]>{
    return this.http.get<any[]>('http://127.0.0.1:8000/account/getById/'+id );
 }

}
