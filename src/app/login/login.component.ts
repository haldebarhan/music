import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { login } from 'src/helpers/login.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logErrorMessage = ''
  constructor(private authService: AuthService) { }
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  user: login = {
    username: '',
    password: ''
  }

  login() {
    this.authService.login(this.user).subscribe({
      next: res => {
        console.log(res)
        this.authService.isAuth = true},
      error: err => this.logErrorMessage = err.error.message,
      complete: ()=> console.log('DONE')
    })
  }
}
