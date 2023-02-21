import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from 'src/app/services/home.service';
declare var jQuery: any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  jobs: any = [];
  options: string[] = [];
  mtypes: any = [];
  userMusicStyle: string[] = [];
  profileForm = this.fb.group({
    nom: [''],
    prenoms: [''],
    email: [''],
    contact: [''],
    metiers: [''],
    pays: [''],
    ville: [''],
    username: [''],
    password: [''],
  });
  constructor(private homeService: HomeService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.getCategories();
    this.test();
  }
  getCategories() {
    jQuery('.select').selectize({
      plugins: ['clear_button'],
      persist: false,
      maxItems: null,
      valueField: 'nom',
      labelField: 'nom',
      items: this.options,
      searchField: ['nom'],
      closeAfterSelect: true,
      options: this.homeService.MusicJobs,
      onItemAdd: (name: string) => {
        this.options.push(name);
      },
      onItemRemove: (name: string) => {
        this.options = this.options.filter((word) => word !== name);
      },
      onClear: () => {
        this.options = [];
      },
    });
  }
  test() {
      jQuery('.tkt').selectize({
        plugins: ['remove_button'],
        valueField: 'nom',
        labelField: 'nom',
        searchField: ['nom'],
        closeAfterSelect: true,
        options: this.mtypes,
        onItemAdd: (name: string) => {
          this.userMusicStyle.push(name);
        },
        onItemRemove: (name: string) => {
          this.userMusicStyle = this.userMusicStyle.filter(
            (word) => word !== name
          );
        },
    });
  }
  onSubmit() {
    console.log(this.profileForm.value);
  }
}
