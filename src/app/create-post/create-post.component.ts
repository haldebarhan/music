import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  ) {}
  eventSubject: Subject<void> = new Subject<void>();
  imageSources: string[] = [];
  form = this.fb.group({
    type: [''],
    cible: [''],
    carateristiques: this.fb.array([]),
  });
  cible = '';
  type_recherche = '';
  user = 'Professionnel'

  ngOnInit(): void {
    this.getCategories();
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
    const options: Array<object> = [
      { id: 'LSS', nom: 'Location de Salle de Spectacle' },
      { id: 'LSR', nom: 'Location de Salle de Répétition' },
      { id: 'SE', nom: "Studio d'Enregistrement" },
      { id: 'LVIM', nom: "Location / Vente d'Instruments de Musique" },
    ];
    if (this.user == 'Professionnel'){
      options.push({id: 'PS', nom: 'Prestation de Service'})
    }
    return options;
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
    const data = <FormData>valeur;
    data.append('categorie', this.getTitle(this.cible));
    this.homeService.createAd('1', data).subscribe((res) => {
      this.emitToChild(res);
    });
  }

  emitToChild(data: any) {
    this.eventSubject.next(data);
  }

  getTitle(cible: string): string {
    switch (cible) {
      case 'LSS':
        return 'SALLE DE SPECTACLE';
      case 'LSR':
        return 'SALLE DE REPETITION';
      case 'SE':
        return "STUDIO D'ENREGISTREMENT";
      case 'LVIM':
        return 'INSTRUMENTS DE MUSIQUE';
      default:
        return '';
    }
  }
}
