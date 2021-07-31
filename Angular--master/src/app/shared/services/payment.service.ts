import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http : HttpClient) { }

   getPayments() : Observable<any[]>{
     return this.http.get<any[]>('http://127.0.0.1:8000/payment/getAll/' );
  }

  postPayment(payment  : any ) : Observable<any>{
    return this.http.post<any>('http://localhost:8000/payment/insert'  , payment  );
  }

  deletePayment(id : number ) {
    return this.http.delete('http://localhost:8000/payment/delete/'+id  );
  }

  putPayment(id : number, payment: any) {
    return this.http.put('http://localhost:8000/payment/update/' +id  , payment );
  }

}
