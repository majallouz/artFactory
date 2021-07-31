import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource} from "@angular/material/table";
import {PaymentService} from "../shared/services/payment.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AccountComponent } from '../account/account.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  id = null ;

  displayedColumns: string[] = ['Account','totalprice' , 'paidprice','actions' ];
  dataSource = new MatTableDataSource([]);

  toDeletePayment = null ;
  toUpdatePayment = null ;

  addForm: FormGroup;
  updateForm: FormGroup;
  payments = [];

  constructor(private router: Router,  private paymentService : PaymentService,private formBuilder : FormBuilder,
    private accountComponent: AccountComponent) { }

  ngOnInit(): void {
    this.getPayments();
    console.log('aaeazer');
    console.log( this.dataSource.data);
    console.log('aaeazer55555555');

    this.addForm = this.formBuilder.group({
      account:  ['', Validators.required ],
      totalprice: ['', Validators.required ],
      paidprice: ['', Validators.required ] 
    });

    this.updateForm = this.formBuilder.group({
      totalprice: ['', Validators.required ],
      paidprice: ['', Validators.required ] 
    });
  }


  add() {
      let payment : any = {} ;
     // payment.id= this.addForm.value.id ;
      payment.totalprice = this.addForm.value.totalprice ;
      payment.paidprice = this.addForm.value.paidprice ;
      let idAccount = this.addForm.value.account ;
      payment.account = idAccount;
      
      
     
      this.paymentService.postPayment(payment).subscribe(
        res => {
          this.getPayments() ;
        },
        error => console.log(error)

      )    
      window.location.reload();
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