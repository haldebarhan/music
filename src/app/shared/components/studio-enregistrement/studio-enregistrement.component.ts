import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import appendImages from 'src/helpers/appendImages';

@Component({
  selector: 'app-studio-enregistrement',
  templateUrl: './studio-enregistrement.component.html',
  styleUrls: ['./studio-enregistrement.component.css'],
})
export class StudioEnregistrementComponent implements OnInit {
  @Output() studioForm = new EventEmitter<object>();
  @Input() events: Observable<void> = new Observable<void>();
  constructor(private fb: FormBuilder) {}
  imageSources: string[] = [];
  images: any = [];
  isPosted: boolean = false;
  image: File | undefined;
  eventsSubscription: Subscription = new Subscription();
  options: any = [];
  otherValue: Array<any> = [];
  caracteristique = '';
  description = '';

  form = this.fb.group({
    titre: ['', Validators.required],
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
    this.images = event.target.files;
    for (let i = 0; i < this.images.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSources.push(e.target.result);
      };
      reader.readAsDataURL(this.images[i]);
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
    const data = new FormData();
    this.isPosted = true;
    this.setData(data);
    if (data.get('type') == 'Professionnel' && this.otherValue.length > 0) {
      for (let item of this.otherValue) {
        data.append(item.caracteristique, item.description);
      }
    }
    if (this.images && this.images.length > 0) {
      appendImages(this.images, this.image, data);
    }
    this.studioForm.emit(data);
    this.eventsSubscription = this.events.subscribe((value) => {
      console.log(value);
      this.resetData();
      this.isPosted = false;
      this.resetData();
    });
  }

  private setData(data: FormData): void {
    data.append('type', <string>this.form.value.type);
    data.append('casque', <string>this.form.value.casque);
    data.append('ia', <string>this.form.value.ia);
    data.append('filtre', <string>this.form.value.filtre);
    data.append('es', <string>this.form.value.es);
    data.append('pm', <string>this.form.value.pm);
    data.append('ordinateur', <string>this.form.value.ordinateur);
    data.append('micro', <string>this.form.value.micro);
    data.append('daw', <string>this.form.value.daw);
    data.append('titre', <string>this.form.value.titre);
  }

  private resetData() {
    this.form.reset();
    this.otherValue = [];
    this.images = [];
    this.imageSources = [];
    this.eventsSubscription.unsubscribe();
  }
}
