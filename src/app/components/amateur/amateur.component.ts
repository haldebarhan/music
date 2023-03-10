import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import getData from 'src/helpers/country.list';
import { matchValidator } from 'src/helpers/form-validator';
import { SimpleUser } from 'src/helpers/user.model';

@Component({
  selector: 'app-amateur',
  templateUrl: './amateur.component.html',
  styleUrls: ['./amateur.component.css'],
})
export class AmateurComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  country: any;
  profileForm = new FormGroup(
    {
      nom: new FormControl('', Validators.required),
      prenoms: new FormControl('', Validators.required),
      email: new FormControl(''),
      contact: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm: new FormControl('', Validators.required),
    },
    [matchValidator.passwordValidator('password', 'confirm')]
  );
  user: SimpleUser = {
    nom: '',
    prenoms: '',
    contact: '',
    email: '',
    pays: '',
    password: '',
  };
  isSubmitted = false;
  ngOnInit(): void {
    this.country = getData();
  }

  save() {
    this.isSubmitted = true;
    this.setdata();
    this.authService.public(this.user).subscribe({
      next: (response) => {
        this.authService.user.next(response);
        this.authService.loggedIn.next(true);
        this.isSubmitted = false;
        this.router.navigate(['/', 'profile']);
      },
    });
  }

  setdata() {
    this.user.nom = <string>this.profileForm.value.nom;
    this.user.prenoms = <string>this.profileForm.value.prenoms;
    this.user.contact = <string>this.profileForm.value.contact;
    this.user.email = <string>this.profileForm.value.email;
    this.user.password = <string>this.profileForm.value.password;
    this.user.pays = <string>this.profileForm.value.pays;
  }
  resetData() {
    this.profileForm.reset();
    this.user.nom = '';
    this.user.prenoms = '';
    this.user.contact = '';
    this.user.email = '';
    this.user.password = '';
    this.user.pays = '';
  }
}
