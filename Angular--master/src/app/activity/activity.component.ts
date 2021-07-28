import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource} from "@angular/material/table";
import {ActivityService} from "../shared/services/activity.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";





@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  id = null ;

  displayedColumns: string[] = ['title','description' , 'actions' ];
  dataSource = new MatTableDataSource([]);

  toDeleteActivity = null ;
  toUpdateActivity = null ;

  addForm: FormGroup;
  updateForm: FormGroup;
  activities = [];

  constructor(private router: Router,  private activityService : ActivityService,private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.getActivities();

    this.addForm = this.formBuilder.group({
      title: ['',  Validators.required ],
      description: ['', Validators.required ] 
    });

    this.updateForm = this.formBuilder.group({
      title: ['',  Validators.required ],
      description: ['', Validators.required ] 
    });
  }


  add() {
    console.log("aa")   
      let activity : any = {} ;
      activity.title = this.addForm.value.title ;
      activity.description = this.addForm.value.description ;
      this.activityService.postActivity(activity).subscribe(
        res => {
          this.getActivities() ;
        },
        error => console.log(error)

      )    
  }

  getActivities(){

    console.log(localStorage.getItem("id"));
    
      this.activityService.getActivities().subscribe(
        (res : any)  => {
          this.dataSource.data = res ;
          this.activities = res;
        } ,
        err => {
          console.log(err)
        }
      )
   
  }

  select( id: any ) {
    this.toDeleteActivity = id ;
  }

  delete() {       
      this.activityService.deleteActivity(this.toDeleteActivity ).subscribe(
        (res : any) => {
          this.getActivities() ;
          this.toDeleteActivity = null
        } ,
        err => console.log(err)
      )   

  }

  selectUpdate(id: any, element: any) {
    this.toUpdateActivity = id ;
    this.updateForm.setValue({
      'title': element.title,
      'description': element.description ,
    });
  }

  update() {
   
      let activity : any = {} ;
      activity.id = this.toUpdateActivity ;
      activity.title = this.updateForm.value.title ;
      activity.description = this.updateForm.value.description ;
      this.activityService.putActivity(activity.id, activity ).subscribe(
        (res : any) => {
          this.getActivities() ;
          this.toUpdateActivity = null
        } ,
        err => console.log(err)
      )
    
  }

  

}
