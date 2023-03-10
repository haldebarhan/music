import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';
import appendImages from 'src/helpers/appendImages';
import { SalleRepet } from 'src/helpers/Salle-Repet.model';

@Component({
  selector: 'app-salle-repetition',
  templateUrl: './salle-repetition.component.html',
  styleUrls: ['./salle-repetition.component.css'],
})
export class SalleRepetitionComponent implements OnInit {
  @Output() salleRep = new EventEmitter<object>();
  @Input() events: Observable<void> = new Observable<void>();

  constructor(private fb: FormBuilder, private hs: HomeService) {}
  imageSources: string[] = [];
  eventsSubscription: Subscription = new Subscription();
  images: any = [];
  image: File | undefined;
  data: any = {};
  isPosted = false;
  form = this.fb.group({
    description: ['', Validators.required],
    materielSon: ['', Validators.required],
    materielLumiere: ['', Validators.required],
    materielScene: ['', Validators.required],
    titre: ['', Validators.required],
    prix: ['', Validators.required],
  });
  divers: Array<any> = [];
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

  saveData() {
    const data = new FormData();
    this.isPosted = true;
    this.setData(data);
    if (this.images && this.images.length > 0) {
      appendImages(this.images, this.image, data);
    }
    this.salleRep.emit(data);
    this.eventsSubscription = this.events.subscribe((value) => {
      this.resetData();
      this.isPosted = false;
    });
  }

  setData(data: FormData): void {
    data.append('materiel_Son', <string>this.form.value.materielSon);
    data.append('materiel_Scene', <string>this.form.value.materielScene);
    data.append('materiel_Lumiere', <string>this.form.value.materielLumiere);
    data.append('description', <string>this.form.value.description);
    data.append('titre', <string>this.form.value.titre);
    data.append('prix', <string>this.form.value.prix);
    if (this.divers && this.divers.length > 0) {
      for (let item of this.divers) {
        data.append('autreMateriel', <string>item);
      }
    }
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
  ngOnInit(): void {}
}
