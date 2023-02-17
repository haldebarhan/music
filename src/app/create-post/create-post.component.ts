import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { Ad } from 'src/helpers/Ad.model';
import { AuthService } from '../services/auth.service';
import { HomeService } from '../services/home.service';
declare var jQuery: any;
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  file: File[] = [];
  search: any = [];
  options: any = [];
  music_tools: any = [];
  userType: string = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private homeService: HomeService
  ) { }
  eventSubject: Subject<void> = new Subject<void>()
  imageSources: string[] = [];
  response: any;
  form = this.fb.group({
    type: [''],
    cible: [''],
    carateristiques: this.fb.array([]),
  });
  cible = '';
  type_recherche = '';

  ngOnInit(): void {
    this.userType = this.authService.userType;
    this.getCategories();
    this.getAllTools();
    this.search = this.getData();
    this.getMusicTools();
  }

  getCategories() {
    this.homeService.getCategories().subscribe((res) => {
      this.options = res;
      jQuery('.select').selectize({
        persist: false,
        maxItems: 1,
        valueField: 'nom',
        labelField: 'nom',
        items: [],
        searchField: ['nom'],
        closeAfterSelect: true,
        options: this.options,
        onItemAdd: (name: string) => (this.cible = name),
      });
    });
  }
  getData(): Array<any> {
    return [
      { id: 'LSS', nom: 'Location de Salle de Spectacle' },
      { id: 'LSR', nom: 'Location de Salle de Répétition' },
      { id: 'SE', nom: "Studio d'Enregistrement" },
      { id: 'A', nom: 'Autres' },
    ];
  }
  MusicTools(): Array<any> {
    return [
      { id: 1, nom: 'Eclairage' },
      { id: 2, nom: 'Sono' },
      { id: 3, nom: 'Table de Mixage' },
      { id: 4, nom: 'Micro' },
      { id: 6, nom: 'Autres' },
    ];
  }

  changeOption() {
    jQuery('.select').selectize({
      persist: false,
      maxItems: 1,
      valueField: 'nom',
      labelField: 'nom',
      items: [],
      searchField: ['nom'],
      closeAfterSelect: true,
      options: this.getData(),
      onItemAdd: (name: string) => (this.cible = name),
    });
  }
  test() {
    console.log(this.file);
  }

  getAllTools() {
    this.homeService.getTools().subscribe((res) => {
      this.music_tools = res;
      jQuery('.tools').selectize({
        plugins: ['remove_button'],
        valueField: 'nom',
        labelField: 'nom',
        searchField: ['nom'],
        closeAfterSelect: true,
        options: this.music_tools,
        onItemAdd: (name: string) => {
          // this.user_music_tools.push(name)
          // this.artiste.instruments?.push(name)
        },
        onItemRemove: (name: string) => {
          // this.user_music_tools = this.user_music_tools.filter(word => word !== name)
          // this.artiste.instruments = this.artiste.instruments?.filter(word => word !== name)
        },
      });
    });
  }

  getMusicTools() {
    jQuery('.tool').selectize({
      persist: false,
      maxItems: 1,
      valueField: 'nom',
      labelField: 'nom',
      items: [],
      searchField: ['nom'],
      closeAfterSelect: true,
      options: this.MusicTools(),
      onItemAdd: (name: string) => (this.cible = name),
    });
  }
  createAd(valeur: any) {
    const data = <FormData>valeur
    data.append('titre', 'CECI NEST PAS UN TITRE')
    data.append('cible', 'CECI EST UNE CIBLE')
    this.homeService.createAd("1", data).subscribe(res => {
      this.response = res
      this.emitToChild(res)
    })
  }

  emitToChild(data: any) {
    this.eventSubject.next(data)
  }

  getTitle(cible: string): string {
    switch (cible) {
      case 'LSS':
        return 'LOCATION DE SALLE DE SPECTACLE'
      case 'LSR':
        return 'LOCATION DE SALLE DE REPETITION'
      case 'SE':
        return 'STUDIO D\'ENREGISTREMENT'
      default:
        return ''
    }
  }
}
