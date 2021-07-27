import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http : HttpClient) { }

   getActivities() : Observable<any[]>{
     return this.http.get<any[]>('http://localhost:8000/activity/getAll' );
  }

  postActivity(activity : any ) : Observable<any>{
    return this.http.post<any>('http://localhost:8000/activity/add/'  , activity  );
  }

  deleteActivity(id : number ) {
    return this.http.delete('http://localhost:8000/activity/delete/'+id  );
  }

  putActivity(id : number, activity: any) {
    return this.http.put('http://localhost:8000/activity/update/' +id  , activity );
  }

}
