import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Song } from 'src/app/models/song.model';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit{

  displayedColumns: string[] = ['name', 'artist', 'symbol'];
  dataSource = new MatTableDataSource();
  clickedRows = new Set<Song>();

  constructor( private songService: SongService, private router:Router) {
 
  }

  ngOnInit(): void {
   

     this.songService.getData()
     this.songService.dataChange$.subscribe((data: Song[])=>{
      this.dataSource.data = data
     })
     
   }

  viewSongDetails(song:Song):void{
    this.router.navigateByUrl('/song/'+`${song.id}`);
  }

}
