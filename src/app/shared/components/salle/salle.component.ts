import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import appendImages from 'src/helpers/appendImages';
import { SalleSpect } from 'src/helpers/Salle-Spect.model';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css'],
})
export class SalleComponent implements OnInit {
  @Output() salleSpecForm = new EventEmitter<object>();
  @Input() events: Observable<void> = new Observable<void>();

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}
  imageSources: string[] = [];
  images: any = [];
  image: File | undefined;
  isPosted: boolean = false;
  eventsSubscription: Subscription = new Subscription();
  divers: Array<any> = [];
  form = this.fb.group({
    titre: ['', Validators.required],
    description: ['', Validators.required],
    nbPlace: ['', Validators.required],
    scene: ['', Validators.required],
    sono: ['', Validators.required],
    prix: ['', Validators.required],
    loge: ['', Validators.required],
    plateau: ['', Validators.required],
    video: ['', Validators.required],
    sourceSon: ['', Validators.required],
    projection: ['', Validators.required],
    mobilier: ['', Validators.required],
    accesSalle: ['', Validators.required],
  });
  diversForm = this.fb.group({
    autre: ['', Validators.required],
  });
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

  setData(data: FormData): void {
    data.append('titre', <string>this.form.value.titre);
    data.append('description', <string>this.form.value.description);
    data.append('accesSalle', <string>this.form.value.accesSalle);
    data.append('prix', <string>this.form.value.accesSalle);
    data.append('nbPlace', <string>this.form.value.nbPlace);
    data.append('scene', <string>this.form.value.scene);
    data.append('sono', <string>this.form.value.sono);
    data.append('loge', <string>this.form.value.loge);
    data.append('plateau', <string>this.form.value.plateau);
    data.append('video', <string>this.form.value.video);
    data.append('sourceSon', <string>this.form.value.sourceSon);
    data.append('projection', <string>this.form.value.projection);
    data.append('mobilier', <string>this.form.value.mobilier);
    if (this.divers && this.divers.length > 0) {
      for (let item of this.divers) {
        data.append('divers', <string>item);
      }
    }
  }
  saveData() {
    const data = new FormData();
    this.isPosted = true;
    this.setData(data);
    if (this.images && this.images.length > 0) {
      appendImages(this.images, this.image, data);
    }
    this.salleSpecForm.emit(data);
    this.eventsSubscription = this.events.subscribe((value) => {
      this.resetData();
      this.isPosted = false;
    });
  }
  resetData() {
    this.form.reset();
    this.images = [];
    this.imageSources = [];
    this.divers = [];
    this.eventsSubscription.unsubscribe();
  }
  addDiver() {
    this.divers.push(<string>this.diversForm.value.autre);
    this.diversForm.reset();
  }

  deleteDiver(item: object) {
    const condition = (element: object) => element == item;
    const index = this.divers.findIndex(condition);
    this.divers.splice(index, 1);
  }
}
