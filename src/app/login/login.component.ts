import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from 'src/helpers/login.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  logErrorMessage = '';
  constructor(private authService: AuthService, private router: Router) {}
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  user: login = {
    username: '',
    password: '',
  };

  ngOnInit() {
    this.authService.AuthError.subscribe(
      (message) => (this.logErrorMessage = message)
    );
  }
  login() {
    this.save();
    this.authService.signIn(this.user).subscribe({
      next: (response) => {
        this.authService.loggedIn.next(true);
        this.authService.user.next(response);
        this.reset();
        this.router.navigate(['/', 'profile']);
      },
      error: (err) => this.authService.CredentialError.next(err.error.message),
    });
  }

  save() {
    this.user.username = <string>this.loginForm.value.username;
    this.user.password = <string>this.loginForm.value.password;
  }

  reset() {
    this.loginForm.reset();
    this.user.username = '';
    this.user.password = '';
  }
}
