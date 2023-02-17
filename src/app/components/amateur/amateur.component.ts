import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import getData from 'src/helpers/country.list';
import { matchValidator } from 'src/helpers/form-validator';
import { SimpleUser } from 'src/helpers/user.model';

@Component({
  selector: 'app-amateur',
  templateUrl: './amateur.component.html',
  styleUrls: ['./amateur.component.css']
})
export class AmateurComponent implements OnInit {
  constructor(private authService: AuthService){}
  country: any
  profileForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenoms: new FormControl('', Validators.required),
    email: new FormControl(''),
    contact: new FormControl('', Validators.required),
    pays: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm: new FormControl('', Validators.required),

  }, [matchValidator.passwordValidator('password', 'confirm')])
  user:SimpleUser = {
    nom: '',
    prenoms: '',
    contact: '',
    email: '',
    pays: '',
    password: '',
  }
  isSubmitted = false
  ngOnInit(): void {
    this.country = getData()
  }

  save(){
    this.isSubmitted = true
    this.authService.publicSignUp(this.user).subscribe(res => {
      console.log(res)
      this.isSubmitted = false
    })
  }
}
