import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Studio } from 'src/helpers/Studio.model';

@Component({
  selector: 'app-studio-enregistrement',
  templateUrl: './studio-enregistrement.component.html',
  styleUrls: ['./studio-enregistrement.component.css'],
})
export class StudioEnregistrementComponent implements OnInit {
  @Output() studioForm = new EventEmitter<object>();
  constructor(private fb: FormBuilder) { }
  imageSources: string[] = [];
  files: File[] = [];
  options: any = [];
  otherValue: Array<any> = [];
  caracteristique = '';
  description = '';
  studio: Studio = {
    type: '',
    ordinateur: '',
    daw: '',
    pm: '',
    ia: '',
    micro: '',
    casque: '',
    filtre: '',
    es: ''
  }
  data: any = {}
  form = this.fb.group({
    type: ['', Validators.required],
    ordinateur: ['', Validators.required],
    daw: ['', Validators.required],
    ia: ['', Validators.required],
    micro: ['', Validators.required],
    casque: ['', Validators.required],
    es: ['', Validators.required],
    pm: ['', Validators.required],
    filtre: ['', Validators.required],
  });
  miniForm = this.fb.group({
    caracteristique: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit(): void {
    this.options = this.getData();
  }
  previewImages(event: any) {
    const files = event.target.files;
    this.files.push(event.target.files);
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSources.push(e.target.result);
      };
      reader.readAsDataURL(files[i]);
    }
  }
  deleteImage(index: number) {
    this.imageSources.splice(index, 1);
  }

  getData(): Array<any> {
    return [
      { id: '1', value: 'Enceinte Monotoring de Studio' },
      { id: '2', value: 'Caissons de Base Monitoring' },
      { id: '3', value: 'Carte Son' },
      { id: '4', value: 'Boîte à Rythmes et Grooveboxe' },
      { id: '5', value: 'Controleurs Midi USB' },
      { id: '6', value: 'Sampleurs' },
      { id: '7', value: 'Interfaces Midi' },
      { id: '8', value: 'Claviers Maîtres' },
      { id: '9', value: 'Loopers' },
      { id: '10', value: 'Enregistreurs Numériques' },
      { id: '11', value: 'Contrôleurs de Monitoring' },
      { id: '12', value: 'Logiciels Création Musicale' },
      { id: '13', value: 'Mobilier Home Studio' },
      { id: '14', value: 'Accessoires Home Studio' },
    ];
  }

  addOthers() {
    this.caracteristique = <string>this.miniForm.value.caracteristique;
    this.description = <string>this.miniForm.value.description;
    this.otherValue.push({
      caracteristique: this.caracteristique,
      description: this.description,
    });
    this.miniForm.reset();
  }

  deleteOthers(item: object) {
    const condition = (element: object) => element == item;
    const index = this.otherValue.findIndex(condition);
    this.otherValue.splice(index, 1);
  }

  get type() {
    return this.form.get('type');
  }

  saveData() {
    this.setData()
    this.data = { ...this.studio }
    if (this.studio.type == 'Professionnel' && this.otherValue.length > 0) {
      for (let item of this.otherValue) {
        this.data[item.caracteristique] = item.description
      }
    }
    if (this.files) {
      this.data["fichier"] = this.files
    }
    this.studioForm.emit(this.data)
    this.resetData()
  }

  private setData() {
    this.studio.type = <string>this.form.value.type
    this.studio.casque = <string>this.form.value.casque
    this.studio.ia = <string>this.form.value.ia
    this.studio.filtre = <string>this.form.value.filtre
    this.studio.es = <string>this.form.value.es
    this.studio.pm = <string>this.form.value.pm
    this.studio.ordinateur = <string>this.form.value.ordinateur
    this.studio.micro = <string>this.form.value.micro
    this.studio.daw = <string>this.form.value.daw
  }

  private resetData() {
    this.form.reset()
    this.otherValue = []
    this.files = []
    this.imageSources = []
  }
}
