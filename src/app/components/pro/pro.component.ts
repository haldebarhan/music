import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';
import { artiste } from 'src/helpers/artiste.model';
import getData from 'src/helpers/country.list';
import { matchValidator } from 'src/helpers/form-validator';
declare var jQuery: any;
@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.css'],
})
export class ProComponent implements OnInit {
  isSubmitted = false;
  jobs: any = [];
  country: any;
  music_styles: any = [];
  music_tools: any = [];
  user_music_styles: string[] = [];
  user_music_tools: string[] = [];
  options: string[] = [];

  profilFrom = new FormGroup(
    {
      nom: new FormControl('', Validators.required),
      prenoms: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      metiers: new FormControl(''),
      pays: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm: new FormControl('', Validators.required),
    },
    [matchValidator.passwordValidator('password', 'confirm')]
  );
  artiste: artiste = {
    nom: '',
    prenoms: '',
    email: '',
    contact: '',
    password: '',
    pays: '',
    metiers: [],
    style_musical: [],
    instruments: [],
  };
  constructor(
    private publicService: HomeService,
    private authSerice: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAllJobs();
    this.getAllTypes();
    this.getAllTools();
    this.country = getData();
  }

  getAllJobs() {
    this.publicService.getCategories().subscribe((res) => {
      this.jobs = res;
      jQuery('.select').selectize({
        plugins: ['clear_button'],
        persist: false,
        maxItems: null,
        valueField: 'nom',
        labelField: 'nom',
        items: this.jobs,
        searchField: ['nom'],
        closeAfterSelect: true,
        options: this.jobs,
        onItemAdd: (name: string) => {
          this.options.push(name);
          this.artiste.metiers.push(name);
        },
        onItemRemove: (name: string) => {
          this.options = this.options.filter((word) => word !== name);
          this.artiste.metiers = this.artiste.metiers.filter(
            (word) => word !== name
          );
        },
        onClear: () => {
          this.options = [];
          this.artiste.metiers = [];
        },
      });
    });
  }

  getAllTypes() {
    this.publicService.getTypes().subscribe((res) => {
      this.music_styles = res;
      jQuery('.tkt').selectize({
        plugins: ['remove_button'],
        valueField: 'nom',
        labelField: 'nom',
        searchField: ['nom'],
        closeAfterSelect: true,
        options: this.music_styles,
        onItemAdd: (name: string) => {
          this.user_music_styles.push(name);
          this.artiste.style_musical?.push(name);
        },
        onItemRemove: (name: string) => {
          this.user_music_styles = this.user_music_styles.filter(
            (word) => word !== name
          );
          this.artiste.style_musical = this.artiste.style_musical?.filter(
            (word) => word !== name
          );
        },
      });
    });
  }

  getAllTools() {
    this.publicService.getTools().subscribe((res) => {
      this.music_tools = res;
      jQuery('.tools').selectize({
        plugins: ['remove_button'],
        valueField: 'nom',
        labelField: 'nom',
        searchField: ['nom'],
        closeAfterSelect: true,
        options: this.music_tools,
        onItemAdd: (name: string) => {
          this.user_music_tools.push(name);
          this.artiste.instruments?.push(name);
        },
        onItemRemove: (name: string) => {
          this.user_music_tools = this.user_music_tools.filter(
            (word) => word !== name
          );
          this.artiste.instruments = this.artiste.instruments?.filter(
            (word) => word !== name
          );
        },
      });
    });
  }

  save() {
    this.isSubmitted = true;
    this.setData();
    this.authSerice.professionnal(this.artiste).subscribe({
      next: (response) => {
        this.authSerice.user.next(response)
        this.authSerice.loggedIn.next(true)
        this.resetData()
        this.isSubmitted = false
        this.router.navigate(['/', 'profile'])
      },
    });
  }

  setData() {
    this.artiste.nom = <string>this.profilFrom.value.nom;
    this.artiste.prenoms = <string>this.profilFrom.value.prenoms;
    this.artiste.email = <string>this.profilFrom.value.email;
    this.artiste.contact = <string>this.profilFrom.value.contact;
    this.artiste.password = <string>this.profilFrom.value.password;
    this.artiste.pays = <string>this.profilFrom.value.pays;
  }

  resetData() {
    this.artiste = {
      nom: '',
      prenoms: '',
      email: '',
      contact: '',
      password: '',
      pays: '',
      metiers: [],
      style_musical: [],
      instruments: [],
    };
    this.profilFrom.reset();
  }
}
