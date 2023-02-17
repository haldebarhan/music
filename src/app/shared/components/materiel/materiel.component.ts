import { Component } from '@angular/core';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css']
})
export class MaterielComponent {
  imageSources: string[] = [];
  files: File[] = []


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
}
