import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/models/artist.model';
import { Song } from 'src/app/models/song.model';
import { SongService } from 'src/app/services/song.service';
import { Response } from 'src/app/models/response.model';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit{

  hide= false
  like !: Boolean
  songId !: string
  public response: Response = {
    key:''
  }
  public song: Song =  {
    id: '',
    name: '',
    artist: new Artist
  }

  stringObject!: any
  stringJson!:any
  constructor(private route: ActivatedRoute, private songService: SongService){

  }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      console.log(params['id'])
      this.songId = params['id']
    })

     this.songService.getDataById(this.songId).subscribe((data: Song) => {
      this.song= data;
      console.log(this.song)
    });

    var clientId = localStorage.getItem('userId');
    if(clientId !== null){

      this.songService.isSongLiked(this.songId,clientId).subscribe((data: any)=>{
        console.log("ceva")
        console.log(typeof data)
        this.like = data
        this.stringJson = JSON.stringify(data);
        console.log("String json object :", this.stringJson);
        console.log("Type :", typeof this.stringJson);
  
        this.stringObject = JSON.parse(this.stringJson);
  
        this.like = this.stringObject.key;
      })   

    }else{
      console.log("nam salvat bine")
    }

    
  }

  pressLikeButton(){
    var clientId = localStorage.getItem('userId');
    if(clientId !== null){

      this.songService.likeSong(this.songId,clientId).subscribe((data: any)=>{
        console.log("ceva")
        console.log(typeof data)
        this.like = data
        this.stringJson = JSON.stringify(data);
        console.log("String json object :", this.stringJson);
        console.log("Type :", typeof this.stringJson);
  
        this.stringObject = JSON.parse(this.stringJson);
  
        this.like = this.stringObject.key;
      })   

    }else{
      console.log("nam salvat bine")
    }
  }  

  getNextSong(){
    this.songService.getNext(this.songId)
    
  }

  getPreviousSong(){
    this.songService.getPrevious(this.songId)
  }

}
