import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/services/song.service';
import { Song } from 'src/app/models/song.model';
import { MatTableDataSource } from '@angular/material/table';
import { Artist } from 'src/app/models/artist.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  displayedColumns: string[] = [ 'name', 'artist', 'symbol'];
  dataSource = new MatTableDataSource();
  clickedRows = new Set<Song>();

  constructor( private songService: SongService, private router:Router) {
 
  }

  
  ngOnInit(): void {
   var clientId = localStorage.getItem('userId');
    if(clientId !== null){

      console.log(clientId)
      this.songService.getSongsFromPlaylist(clientId)
      this.songService.dataChange$.subscribe((data: Song[]) => {
        this.dataSource.data = data;
      });

    }else{
      console.log("nam salvat bine")
    }
    
  }

  viewSongDetails(song:Song):void{
    this.router.navigateByUrl('/song/'+`${song.id}`);
  }

}
