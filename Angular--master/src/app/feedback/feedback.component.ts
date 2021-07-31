import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource} from "@angular/material/table";
import {FeedbackService} from "../shared/services/feedback.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";





@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  id = null ;

  displayedColumns: string[] = ['rating','comment' , 'actions' ];
  dataSource = new MatTableDataSource([]);

  toDeleteFeedback = null ;
  toUpdateFeedback = null ;

  addForm: FormGroup;
  updateForm: FormGroup;
  feedbacks = [];

  constructor(private router: Router,  private feedbackService : FeedbackService,private formBuilder : FormBuilder) { }

  admin:string;
  test:boolean=false;
  value:string="admin";


  ngOnInit(): void {
    this.admin=localStorage.getItem("id");  
    console.log(this.admin === this.value);

    if(this.admin === this.value) {
      this.test=true;
      this.displayedColumns = ['rating','comment' , 'actions' ];
  
    
    }
    this.router.navigate(['feedback']);
    this.getFeedbacks();

    this.addForm = this.formBuilder.group({
      rating: ['',  Validators.required ],
      comment: ['', Validators.required ]
    });

    this.updateForm = this.formBuilder.group({
      rating: ['',  Validators.required ],
      comment: ['', Validators.required ]
    });
  }


  add() {
    console.log("aa")
    let feedback : any = {} ;
    feedback.rating = this.addForm.value.rating ;
    feedback.comment = this.addForm.value.comment ;
    this.feedbackService.postFeedback(feedback).subscribe(
      res => {
        this.getFeedbacks() ;
      },
      error => console.log(error)

    )
  }

  getFeedbacks(){

    console.log(localStorage.getItem("id"));

    this.feedbackService.getFeedbacks().subscribe(
      (res : any)  => {
        this.dataSource.data = res ;
        this.feedbacks = res;
      } ,
      err => {
        console.log(err)
      }
    )

  }

  select( id: any ) {
    this.toDeleteFeedback = id ;
  }

  delete() {
    this.feedbackService.deleteFeedback(this.toDeleteFeedback ).subscribe(
      (res : any) => {
        this.getFeedbacks() ;
        this.toDeleteFeedback = null
      } ,
      err => console.log(err)
    )

  }

  selectUpdate(id: any, element: any) {
    this.toUpdateFeedback = id ;
    this.updateForm.setValue({
      'rating': element.rating,
      'comment': element.comment ,
    });
  }

  update() {

    let feedback : any = {} ;
    feedback.id = this.toUpdateFeedback ;
    feedback.rating = this.updateForm.value.rating ;
    feedback.comment = this.updateForm.value.comment ;
    this.feedbackService.putFeedback(feedback.id, feedback ).subscribe(
      (res : any) => {
        this.getFeedbacks() ;
        this.toUpdateFeedback = null
      } ,
      err => console.log(err)
    )

  }



}

