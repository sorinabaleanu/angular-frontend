import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../models/client.model';
import { Playlist } from '../models/playlist.model';
import { BaseDataService } from './base.data.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends BaseDataService<Client> {

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
    this.serviceURL = 'client';
  }

}
