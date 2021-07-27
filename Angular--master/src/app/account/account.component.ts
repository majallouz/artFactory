import { AccountService } from './../shared/services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  id = null ;

  displayedColumns: string[] = ['nom','prenom' , 'age' , 'email' ];
  dataSource = new MatTableDataSource([]);

  toDeleteAccount = null ;
  toUpdateAccount = null ;

  addForm: FormGroup;
  updateForm: FormGroup;
  accounts = [];

  constructor(private router: Router,  private accountService : AccountService,private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.getAccounts();

    this.addForm = this.formBuilder.group({
      nom: ['',  Validators.required ],
      prenom: ['', Validators.required ],
      age: ['', Validators.required ],
      email: ['', Validators.required ]
    });

    this.updateForm = this.formBuilder.group({
      nom: ['',  Validators.required ],
      prenom: ['', Validators.required ],
      age: ['', Validators.required ],
      email: ['', Validators.required ]
    });
  }

  add() {
    console.log("aa")   
      let account : any = {} ;
      account.nom = this.addForm.value.nom ;
      account.prenom = this.addForm.value.prenom ;
      account.age = this.addForm.value.age ;
      account.email = this.addForm.value.email ;
      this.accountService.postAccount(account).subscribe(
        res => {
          this.getAccounts ;
        },
        error => console.log(error)

      )    
  }

  getAccounts(){
    
      this.accountService.getAccounts().subscribe(
        (res : any)  => {
          this.dataSource.data = res ;
          this.accounts = res;
        } ,
        err => {
          console.log(err)
        }
      )
   
  }

  select( id: any ) {
    this.toDeleteAccount = id ;
  }

  delete() {       
      this.accountService.deleteAccount(this.toDeleteAccount ).subscribe(
        (res : any) => {
          this.getAccounts() ;
          this.toDeleteAccount = null
        } ,
        err => console.log(err)
      )   

  }

  selectUpdate(id: any, element: any) {
    this.toUpdateAccount = id ;
    this.updateForm.setValue({
      'nom': element.nom,
      'prenom': element.prenom ,
      'age': element.age ,
      'email': element.email ,
    });
  }

  update() {
   
      let account : any = {} ;
      account.id = this.toUpdateAccount ;
      account.nom = this.updateForm.value.nom ;
      account.prenom = this.updateForm.value.prenom ;
      account.age = this.updateForm.value.age ;
      account.email = this.updateForm.value.email ;
      this.accountService.putAccount(account.id, account ).subscribe(
        (res : any) => {
          this.getAccounts() ;
          this.toUpdateAccount = null
        } ,
        err => console.log(err)
      )
    
  }

}
