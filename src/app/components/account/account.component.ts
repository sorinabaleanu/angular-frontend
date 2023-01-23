import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.data.service';
import { Playlist } from '../../models/playlist.model';
import { LoginService } from '../../services/login.data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  clientForm: FormGroup

  client: Client = {
    id: '',
    name: '',
    username: '',
    password: '',
    playlist: new Playlist
  }

  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private clientService: ClientService, private loginService: LoginService) {
    this.clientForm = this._formBuilder.group({
      id: [null],
      name: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
      playlist:[null]
    });

    this.clientForm.setValue(this.client);
  }

  createAccount(){
    console.log(this.clientForm.value)
    this.clientService
    .addItem(this.clientForm.value)
    .subscribe((data) => {
      console.log(data);
      this.loginService.login(data)
    });


  }
}
