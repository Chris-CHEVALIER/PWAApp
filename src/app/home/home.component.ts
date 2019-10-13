import { Component, OnInit } from '@angular/core';
import * as data from '../data/data.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products;
  profile = {
    "man": 0,
			"woman": 0,
			"cspp": 0,
			"cspm": 0,
			"young": 0,
			"adult": 0,
			"old": 0
  }

  constructor() { }

  ngOnInit() {
    this.products = data.products;
  }


  addProduct(product){
    this.profile.man = product.man;
    this.profile.woman = product.woman;
    this.profile.cspp = product.cspp;
    this.profile.cspm = product.cspm;
    this.profile.young = product.young;
    this.profile.adult = product.adult;
    this.profile.old = product.old;
    console.log(this.profile);
    
  }
}
