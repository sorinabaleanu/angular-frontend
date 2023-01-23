import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Client } from 'src/app/models/client.model';
import { Playlist } from 'src/app/models/playlist.model';
import { LoginService } from 'src/app/services/login.data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm !: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder,  private loginService: LoginService, private router:Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    localStorage.setItem('userId', '');
  }

  login(){
    const account: Client = {
      id: '',
      name: '',
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      playlist: new Playlist
    }

    this.loginService.login(account);
    
  }

  createAccount(){
    this.router.navigateByUrl('/new-account');
  }

}
