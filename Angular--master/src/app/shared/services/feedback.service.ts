import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http : HttpClient) { }

   getFeedbacks() : Observable<any[]>{
     return this.http.get<any[]>('http://localhost:8000/feedback/getAll' );
  }

  postFeedback(feedback : any ) : Observable<any>{
    return this.http.post<any>('http://localhost:8000/feedback/add/'  , feedback  );
  }

  deleteFeedback(id : number ) {
    return this.http.delete('http://localhost:8000/feedback/delete/'+id  );
  }

  putFeedback(id : number, feedback: any) {
    return this.http.put('http://localhost:8000/feedback/update/' +id  , feedback );
  }

}
