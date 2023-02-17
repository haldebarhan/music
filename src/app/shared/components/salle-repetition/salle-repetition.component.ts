import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';
import { SalleRepet } from 'src/helpers/Salle-Repet.model';

@Component({
  selector: 'app-salle-repetition',
  templateUrl: './salle-repetition.component.html',
  styleUrls: ['./salle-repetition.component.css']
})
export class SalleRepetitionComponent implements OnDestroy {

  @Output() salleRep = new EventEmitter<object>()
  @Input() events: Observable<void> = new Observable<void>();

  constructor(private fb: FormBuilder, private hs: HomeService) { }
  imageSources: string[] = [];
  eventsSubscription: Subscription | undefined
  images: any = []
  image: File | undefined
  data: any = {}
  formdata: FormData = new FormData()
  isPosted = false
  form = this.fb.group({
    description: ['', Validators.required],
    materielSon: ['', Validators.required],
    materielLumiere: ['', Validators.required],
    materielScene: ['', Validators.required],
    autreMateriel: ['', Validators.required],
  })
  salle: SalleRepet = {
    description: '',
    materielSon: '',
    materielLumiere: '',
    materielScene: '',
    autreMateriel: '',
  }
  previewImages(event: any) {
    const files = event.target.files;
    this.images = event.target.files
    // this.image = <File>event.target.files[0]
    // const formdata = new FormData()
    // formdata.append("text", "BBJBH")
    // formdata.append("image", "cdcd")
    // formdata.append("iii", "Bpmpp")
    // for (let index = 0; index < files.length; index++) {
    //   this.image = files[index]
    //   formdata.append('fichiers', <string | Blob>this.image, this.generateOPT() + this.image?.name)
    // }
    // formdata.append('fichier', this.image, this.image.name)
    // this.hs.createAd('1', formdata).subscribe(res => console.log(res))
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => { this.imageSources.push(e.target.result) };
      reader.readAsDataURL(files[i]);
    }
  }
  deleteImage(index: number) {
    this.imageSources.splice(index, 1);
  }

  saveData() {
    this.isPosted = true
    this.setData()
    if (this.images && this.images.length > 0) {
      for (let index = 0; index < this.images.length; index++) {
        this.image = this.images[index]
        this.formdata.append("fichiers", <string | Blob>this.image, this.generateOPT() + this.image?.name)
      }
    }
    this.salleRep.emit(this.formdata)
    this.eventsSubscription = this.events.subscribe((value) => {
      console.log(value)
      this.resetData()
      this.isPosted = false
    })
  }

  setData() {
    this.formdata.append("materielSon", <string>this.form.value.materielSon)
    this.formdata.append("materielScene", <string>this.form.value.materielScene)
    this.formdata.append("materielLumiere", <string>this.form.value.materielLumiere)
    this.formdata.append("description", <string>this.form.value.description)
    this.formdata.append("autreMateriel", <string>this.form.value.autreMateriel)
    // this.salle.autreMateriel = <string>this.form.value.autreMateriel
    // this.salle.description = <string>this.form.value.description
    // this.salle.materielLumiere = <string>this.form.value.materielLumiere
    // this.salle.materielScene = <string>this.form.value.materielScene
    // this.salle.materielSon = <string>this.form.value.materielSon
  }
  resetData() {
    this.form.reset()
    this.images = []
    this.imageSources = []
  }
  ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe()
  }

  generateOPT(): string {
    var digits = '0123456789'
    let OPT = ''
    for (let i = 0; i < 6; i++) {
      OPT += digits[Math.floor(Math.random() * 10)]
    }
    return OPT
  }
}
