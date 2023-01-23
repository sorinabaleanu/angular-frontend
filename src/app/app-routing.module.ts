import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/login/login.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { SongComponent } from './components/song/song.component';
import { Playlist } from './models/playlist.model';
import { SongsComponent } from './components/songs/songs.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { HasRoleGuard } from './shared/has-role.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'new-account',
    component: AccountComponent,
  },
  {
    path: 'playlist',
    component: PlaylistComponent,
    canActivate: [HasRoleGuard],
  },
  {
    path: 'song/:id',
    component: SongComponent,
    canActivate: [HasRoleGuard],
  },
  {
    path: 'songs',
    component:SongsComponent
  },
  {
    path: 'account',
    component: AccountDetailsComponent,
    canActivate: [HasRoleGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
