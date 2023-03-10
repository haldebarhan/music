import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';
import appendImages from 'src/helpers/appendImages';

declare var jQuery: any;
@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css'],
})
export class MaterielComponent implements OnInit {
  imageSources: string[] = [];
  images: any = [];
  instruments: any = [];
  test: any;
  eventsSubscription: Subscription = new Subscription();
  selectedTools: string = '';
  image: File | undefined;
  @Output() Instrus = new EventEmitter<any>();
  @Input() events: Observable<void> = new Observable<void>();

  constructor(private fb: FormBuilder, private homeService: HomeService) {}
  ngOnInit(): void {
    this.getAllTools();
  }
  isPosted = false;
  form = this.fb.group({
    titre: ['', Validators.required],
    prix: ['', Validators.required],
    type: ['', Validators.required],
    description: ['', Validators.required],
    marque: ['', Validators.required],
    model: ['', Validators.required],
    materiau: ['', Validators.required],
    couleur: ['', Validators.required],
    poids: ['', Validators.required],
    dimesions: ['', Validators.required],
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
    this.isPosted = true;
    const data = new FormData();
    this.setData(data);
    if (this.images && this.images.length > 0) {
      appendImages(this.images, this.image, data);
    }
    console.log(this.form.value, this.selectedTools);
    this.Instrus.emit(data);
    this.eventsSubscription = this.events.subscribe((value) => {
      this.resetData();
      this.isPosted = false;
    });
  }

  setData(data: FormData) {
    data.append('description', <string>this.form.value.description);
    data.append('prix', <string>this.form.value.prix);
    data.append('type', <string>this.form.value.type);
    data.append('titre', <string>this.form.value.titre);
    data.append('instrument', this.selectedTools);
    data.append('marque', <string>this.form.value.marque);
    data.append('model', <string>this.form.value.model);
    data.append('materiau', <string>this.form.value.materiau);
    data.append('couleur', <string>this.form.value.couleur);
    data.append('poids', <string>this.form.value.poids);
    data.append('dimensions', <string>this.form.value.dimesions);
  }
  resetData() {
    this.form.reset();
    this.images = [];
    this.imageSources = [];
    this.eventsSubscription.unsubscribe();
  }

  getAllTools() {
    this.homeService.getTools().subscribe((res) => {
      this.instruments = res;
      jQuery('.tools').selectize({
        plugins: ['remove_button'],
        valueField: 'nom',
        labelField: 'nom',
        searchField: ['nom'],
        closeAfterSelect: true,
        options: this.instruments,
        onItemAdd: (name: string) => {
          this.selectedTools = name;
        },
        onItemRemove: (name: string) => {
          this.selectedTools = '';
        },
      });
    });
  }
}
