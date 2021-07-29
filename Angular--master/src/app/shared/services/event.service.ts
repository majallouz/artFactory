import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http : HttpClient) { }

  getEvents() : Observable<any[]>{
    return this.http.get<any[]>('http://localhost:8000/event/getAll' );
  }

  postEvent(event : any ) : Observable<any>{
    return this.http.post<any>('http://localhost:8000/event/add/'  , event  );
  }

  deleteEvent(id : number ) {
    return this.http.delete('http://localhost:8000/event/delete/'+id  );
  }

  putEvent(id : number, event: any) {
    return this.http.put('http://localhost:8000/event/update/' +id  , event );
  }

}
