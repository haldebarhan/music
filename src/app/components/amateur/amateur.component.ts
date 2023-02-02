import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import getData from 'src/helpers/country.list';
import { matchValidator } from 'src/helpers/form-validator';

@Component({
  selector: 'app-amateur',
  templateUrl: './amateur.component.html',
  styleUrls: ['./amateur.component.css']
})
export class AmateurComponent implements OnInit {
  country: any
  profileForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenoms: new FormControl('', Validators.required),
    email: new FormControl(''),
    contact: new FormControl('', Validators.required),
    pays: new FormControl('', Validators.required),
    ville: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm: new FormControl('', Validators.required),

  }, [matchValidator.passwordValidator('password', 'confirm')])
  ngOnInit(): void {
    this.country = getData()
  }

  save(){
    console.log(this.profileForm.value)
  }
}
