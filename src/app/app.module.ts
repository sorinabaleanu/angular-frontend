import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { SongComponent } from './components/song/song.component';
import { AccountComponent } from './components/account/account.component';
import { SongsComponent } from './components/songs/songs.component';
import { Router } from '@angular/router';
import { AccountDetailsComponent } from './components/account-details/account-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlaylistComponent,
    SongComponent,
    AccountComponent,
    SongsComponent,
    AccountDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 
 }
