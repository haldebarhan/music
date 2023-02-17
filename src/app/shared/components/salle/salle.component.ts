import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SalleSpect } from 'src/helpers/Salle-Spect.model';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css'],
})
export class SalleComponent implements OnInit {

  @Output() salleSpecForm = new EventEmitter<object>()
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
  }
  imageSources: string[] = [];
  files: File[] = []
  form = this.fb.group({
    nbPlace: ['', Validators.required],
    scene: ['', Validators.required],
    sono: ['', Validators.required],
    loge: ['', Validators.required],
    plateau: ['', Validators.required],
    video: ['', Validators.required],
    sourceSon: ['', Validators.required],
    projection: ['', Validators.required],
    mobilier: ['', Validators.required],
    accesSalle: ['', Validators.required],
    divers: ['', Validators.required],
  })
  data: any = {}
  salle: SalleSpect = {
    nbPlace: '',
    scene: '',
    sono: '',
    loge: '',
    plateau: '',
    video: '',
    sourceSon: '',
    projection: '',
    mobilier: '',
    accesSalle: '',
    divers: '',
  }
  previewImages(event: any) {
    console.log(event.target.value)
    const files = event.target.files;
    this.files.push(event.target.files)
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => { this.imageSources.push(e.target.result) };
      reader.readAsDataURL(files[i]);
    }
  }
  deleteImage(index: number) {
    this.imageSources.splice(index, 1);
  }

  setData() {
    this.salle.accesSalle = <string>this.form.value.accesSalle
    this.salle.nbPlace = <string>this.form.value.nbPlace
    this.salle.scene = <string>this.form.value.scene
    this.salle.sono = <string>this.form.value.sono
    this.salle.loge = <string>this.form.value.loge
    this.salle.plateau = <string>this.form.value.plateau
    this.salle.video = <string>this.form.value.video
    this.salle.sourceSon = <string>this.form.value.sourceSon
    this.salle.projection = <string>this.form.value.projection
    this.salle.mobilier = <string>this.form.value.mobilier
    this.salle.accesSalle = <string>this.form.value.accesSalle
    this.salle.divers = <string>this.form.value.divers
    this.data = { ...this.salle }
  }
  saveData() {
    this.setData()
    if (this.files) {
      this.data["fichier"] = this.files
    }
    this.salleSpecForm.emit(this.data)
    this.resetForm()
  }
  resetForm() {
    this.form.reset()
    this.files = []
    this.imageSources = []
  }
}
