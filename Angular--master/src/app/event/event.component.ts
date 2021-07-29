import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource} from "@angular/material/table";
import {EventService} from "../shared/services/event.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";





@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  id = null ;

  displayedColumns: string[] = ['name','description' , 'actions' ];
  dataSource = new MatTableDataSource([]);

  toDeleteEvent = null ;
  toUpdateEvent = null ;

  addForm: FormGroup;
  updateForm: FormGroup;
  events = [];

  constructor(private router: Router,  private eventService : EventService,private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.getEvents();

    this.addForm = this.formBuilder.group({
      name: ['',  Validators.required ],
      description: ['', Validators.required ]
    });

    this.updateForm = this.formBuilder.group({
      name: ['',  Validators.required ],
      description: ['', Validators.required ]
    });
  }


  add() {
    console.log("aa")
    let event : any = {} ;
    event.name = this.addForm.value.name ;
    event.description = this.addForm.value.description ;
    this.eventService.postEvent(event).subscribe(
      res => {
        this.getEvents() ;
      },
      error => console.log(error)

    )
  }

  getEvents(){

    console.log(localStorage.getItem("id"));

    this.eventService.getEvents().subscribe(
      (res : any)  => {
        this.dataSource.data = res ;
        this.events = res;
      } ,
      err => {
        console.log(err)
      }
    )

  }

  select( id: any ) {
    this.toDeleteEvent = id ;
  }

  delete() {
    this.eventService.deleteEvent(this.toDeleteEvent ).subscribe(
      (res : any) => {
        this.getEvents() ;
        this.toDeleteEvent = null
      } ,
      err => console.log(err)
    )

  }

  selectUpdate(id: any, element: any) {
    this.toUpdateEvent = id ;
    this.updateForm.setValue({
      'name': element.name,
      'description': element.Description ,
    });
  }

  update() {

    let event : any = {} ;
    event.id = this.toUpdateEvent ;
    event.name = this.updateForm.value.name ;
    event.description = this.updateForm.value.description ;
    this.eventService.putEvent(event.id, event ).subscribe(
      (res : any) => {
        this.getEvents() ;
        this.toUpdateEvent = null
      } ,
      err => console.log(err)
    )

  }



}

