import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource} from "@angular/material/table";
import {PaymentService} from "../shared/services/payment.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  id = null ;

  displayedColumns: string[] = ['totalprice' , 'paidprice','actions' ];
  dataSource = new MatTableDataSource([]);

  toDeletePayment = null ;
  toUpdatePayment = null ;

  addForm: FormGroup;
  updateForm: FormGroup;
  payments = [];

  constructor(private router: Router,  private paymentService : PaymentService,private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.getPayments();

    this.addForm = this.formBuilder.group({
      totalprice: ['', Validators.required ],
      paidprice: ['', Validators.required ] 
    });

    this.updateForm = this.formBuilder.group({
      totalprice: ['', Validators.required ],
      paidprice: ['', Validators.required ] 
    });
  }


  add() {
    console.log("aa")   
      let payment : any = {} ;
      payment.id= this.addForm.value.id ;
      payment.totalprice = this.addForm.value.totalprice ;
      payment.paidprice = this.addForm.value.paidprice ;
      this.paymentService.postPayment(payment).subscribe(
        res => {
          this.getPayments() ;
        },
        error => console.log(error)

      )    
  }

  getPayments(){

    console.log(localStorage.getItem("id"));
    
      this.paymentService.getPayments().subscribe(
        (res : any)  => {
          this.dataSource.data = res ;
          this.payments = res;
        } ,
        err => {
          console.log(err)
        }
      )
   
  }

  select( id: any ) {
    this.toDeletePayment = id ;
  }

  delete() {       
      this.paymentService.deletePayment(this.toDeletePayment ).subscribe(
        (res : any) => {
          this.getPayments() ;
          this.toDeletePayment = null
        } ,
        err => console.log(err)
      )   

  }

  selectUpdate(id: any, element: any) {
    this.toUpdatePayment = id ;
    this.updateForm.setValue({
      'totalprice': element.TotalPrice ,
      'paidprice': element.PaidPrice ,
    });
  }

  update() {
   
      let payment : any = {} ;
      payment.id = this.toUpdatePayment ;
      payment.totalprice = this.updateForm.value.totalprice ;
      payment.paidprice = this.updateForm.value.paidprice ;
      this.paymentService.putPayment(payment.id, payment ).subscribe(
        (res : any) => {
          this.getPayments() ;
          this.toUpdatePayment = null
        } ,
        err => console.log(err)
      )
    
  }

  

}