import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Song } from '../models/song.model';
import { BaseDataService } from './base.data.service';
import { Client } from '../models/client.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root',
})
export class SongService extends BaseDataService<Song> {

    ok: Boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) {
    super(httpClient);
    this.serviceURL = '/song';
  }

  getSongsFromPlaylist(id: string): void {
    this.httpClient
      .get<Song[]>(this.apiURL+'/client/likes'+`/${id}`, this.httpOptions)
      .pipe(
        map((data: any) => {
          
          return data;
        })
      )
      .subscribe(
        (data: Song[]) => {
          this.dataChange$.next(data);
          console.log(this.apiURL+'/likes'+`/${id}`)
          return data;
        },
        (err: HttpErrorResponse) => {
          alert(`Error: ${err.name} ${err.message}`);
        }
      );
  }

  isSongLiked(songId: string, clientId: string): Observable<Response>{

    return this.httpClient
      .get<Response>(this.apiURL + "/like"+ `/${songId}/${clientId}`, this.httpOptions)
      .pipe(
        map((data: Response) => {
          return data;
        })
      )
  }

  likeSong(songId: string, clientId: string): Observable<Response> {
    return this.httpClient.put<Response>(this.apiURL + "/like"+ `/${songId}/${clientId}`, this.httpOptions)
    .pipe(
      map((data: Response) => {
        return data;
      })
    )
                              
  }

  getNextSong(songId:string): Observable<Song>{
    return this.httpClient
    .get<Song>(this.apiURL +"/next"+`/${songId}`, this.httpOptions)
    .pipe(
      map((data: Song) => {
       return data
      })
    )
  }

  getNext(songId:string){
    this.getNextSong(songId).subscribe(data=>{
      this.router.navigateByUrl("/song/"+`${data.id}`).then(() => window.location.reload())
      
    })
  }

  
  getPreviousSong(songId:string): Observable<Song>{
    return this.httpClient
    .get<Song>(this.apiURL +"/previous"+`/${songId}`, this.httpOptions)
    .pipe(
      map((data: Song) => {
       return data
      })
    )
  }

  getPrevious(songId:string){
    this.getPreviousSong(songId).subscribe(data=>{
      this.router.navigateByUrl("/song/"+`${data.id}`).then(()=>window.location.reload())
    })
  }

  

}
