import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../models/client.model';
import { Playlist } from '../models/playlist.model';
import { BaseDataService } from './base.data.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseDataService<Client> {

    ok: boolean = false;

    public acc: Client ={
        id: '',
        name : '',
        username: '',
        password: '',
        playlist: new Playlist
    }
  constructor(private httpClient: HttpClient, private router: Router) {
    super(httpClient);
    this.serviceURL = '/client/login';
  }

  login(client: Client) {
    this.addItem(client).subscribe( data => {
        this.acc = data;

        if (data === null) {
            this.router.navigateByUrl('/login');
            alert('Wrong username or password');
        } 
        else {
          this.router.navigateByUrl('/playlist');
          localStorage.setItem('userId', data.id);
        }
      })
    }
}
