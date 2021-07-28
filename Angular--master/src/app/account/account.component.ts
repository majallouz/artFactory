import { element } from 'protractor';
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

  displayedColumns: string[] = ['nom','prenom' , 'age' , 'email' , 'actions'];
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
      email: ['', Validators.required ],
      password: ['', Validators.required ]
    });

    this.updateForm = this.formBuilder.group({
      nom: ['',  Validators.required ],
      prenom: ['', Validators.required ],
      age: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required ]

    });
  }

  add() { 
      let account : any = {} ;
      account.nom = this.addForm.value.nom ;
      account.prenom = this.addForm.value.prenom ;
      account.pge = this.addForm.value.age ;
      account.email = this.addForm.value.email ;
      account.password = this.addForm.value.password;
      this.accountService.postAccount(account).subscribe(
        res => {
          this.getAccounts() ;
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
      'nom': element.Nom,
      'prenom': element.Prenom ,
      'age': element.Age ,
      'email': element.Email ,
      'password' : element.Password
    });
  }

  update() {
   
      let account : any = {} ;
      account.id = this.toUpdateAccount ;
      account.nom = this.updateForm.value.nom ;
      account.prenom = this.updateForm.value.prenom ;
      account.age = this.updateForm.value.age ;
      account.email = this.updateForm.value.email ;
      account.password = this.updateForm.value.password;
      this.accountService.putAccount(account.id, account ).subscribe(
        (res : any) => {
          this.getAccounts() ;
          this.toUpdateAccount = null
        } ,
        err => console.log(err)
      )
    
  }

}
