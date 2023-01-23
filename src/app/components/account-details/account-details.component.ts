import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.data.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  hide = true
  updateForm !: FormGroup

  constructor(private router: Router,private clientService: ClientService, private formBuilder: FormBuilder)
  {
    this.updateForm = this.formBuilder.group({
      id:[''],
      name:['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      likedSongs: ['']
    })
  }

  ngOnInit(): void {
    var clientId = localStorage.getItem('userId');
    if(clientId !== null){

      console.log(clientId)
      this.clientService.getDataById(clientId).subscribe((data: Client)=>{
        this.updateForm.setValue(data)
      })

    }else{
      console.log("nam salvat bine")
    }
    
  }

  update(){
    this.clientService
      .updateItem(this.updateForm.value)
      .subscribe((data) => {
        console.log(data);
      });
      var clientId = localStorage.getItem('userId');
      if(clientId!= null)
      {
        this.clientService.getDataById(clientId).subscribe((data: Client)=>{
          this.updateForm.setValue(data)
        })
      }
  }

  delete(){
    this.clientService.deleteItem(this.updateForm.value.id).subscribe(data=>{
      this.router.navigateByUrl("/login")
    })
  }

}
