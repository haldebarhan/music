import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cats: any = []
  constructor(private homeService: HomeService) { }
  ngOnInit(): void {
    this.getCategories()
  }


  getCategories() {
    this.homeService.getCategories().subscribe(res => {
      this.cats = res
      
    }, err => console.log(err))
  }

}
