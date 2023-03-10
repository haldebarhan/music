import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private authservice: AuthService) {}
  ngOnInit(): void {
    this.authservice.userData.subscribe({
      next: (user) => {
        this.user = user;
        console.log(this.user);
      },
    });
  }
}
