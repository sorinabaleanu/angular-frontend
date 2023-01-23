import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';

  constructor(private router: Router)
  {
    
  }

  viewAllSongs(){
    this.router.navigateByUrl('/songs');
  }

  viewAccountDetails(){
    this.router.navigateByUrl('/account')
  }

  logout()
  {
    localStorage.setItem("userId", '')
    this.router.navigateByUrl('/login')
  }

  viewPlaylist(){
    this.router.navigateByUrl("/playlist")
  }
}
