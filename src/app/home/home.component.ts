import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as data from '../data/data.json';
import { Profile } from './Profile';
import { Product } from './Product';
import { PushNotificationService } from '../push-notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  productForm = new FormGroup({
    man: new FormControl(''),
    woman: new FormControl(''),
    cspp: new FormControl(''),
    cspm: new FormControl(''),
    young: new FormControl(''),
    adult: new FormControl(''),
    old: new FormControl('')
  });

  products : Product[] = [];
  profile : Profile = {
    "man": 0,
    "woman": 0,
    "cspp": 0,
    "cspm": 0,
    "young": 0,
    "adult": 0,
    "old": 0
  };
  selectedProducts : Product[] = [];
  proposedProducts : Product[] = [];
  profiles : Profile[] = [this.profile];
  pushNotificationService : PushNotificationService;

  constructor(pushNotificationService: PushNotificationService) {
    this.pushNotificationService = pushNotificationService;
  }

  ngOnInit() {
    data.products.forEach(p => {
      this.products.push(p as Product);
    });
    this.updateDistances();
  }

  addProfile() {
    let newProfile : Profile = {
      "man": 0,
      "woman": 0,
      "cspp": 0,
      "cspm": 0,
      "young": 0,
      "adult": 0,
      "old": 0
    };
    this.profiles.push(newProfile);
  }

  changeProfile(profile : Profile) {
    this.profile = profile;
    this.updateDistances();
    console.log(this.profile);
  }

  addProduct(product : Product) {
    let manSum = 0;
    let womanSum = 0;
    let csppSum = 0;
    let cspmSum = 0;
    let youngSum = 0;
    let adultSum = 0;
    let oldSum = 0;

    if (!product.float) {
      if(this.selectedProducts.length >= 3) this.selectedProducts.shift();
      this.selectedProducts.push(product);

      for (var i = 0; i < this.selectedProducts.length; i++) {
        manSum += this.selectedProducts[i].man;
        womanSum += this.selectedProducts[i].woman;
        csppSum += this.selectedProducts[i].cspp;
        cspmSum += this.selectedProducts[i].cspm;
        youngSum += this.selectedProducts[i].young;
        adultSum += this.selectedProducts[i].adult;
        oldSum += this.selectedProducts[i].old;
      }
      this.profile.man = manSum / this.selectedProducts.length;
      this.profile.woman = womanSum / this.selectedProducts.length;
      this.profile.cspp = csppSum / this.selectedProducts.length;
      this.profile.cspm = cspmSum / this.selectedProducts.length;
      this.profile.young = youngSum / this.selectedProducts.length;
      this.profile.adult = adultSum / this.selectedProducts.length;
      this.profile.old = oldSum / this.selectedProducts.length;
    } else if (product.float) {
      for (var i = 0; i < this.profiles.length; i++) {
        manSum += this.profiles[i].man;
        womanSum += this.profiles[i].woman;
        csppSum += this.profiles[i].cspp;
        cspmSum += this.profiles[i].cspm;
        youngSum += this.profiles[i].young;
        adultSum += this.profiles[i].adult;
        oldSum += this.profiles[i].old;
      }
      product.man =  Math.round((manSum / this.profiles.length)*100)/100;;
      product.woman = Math.round((womanSum / this.profiles.length)*100)/100;
      product.cspp = Math.round((csppSum / this.profiles.length)*100)/100;;
      product.cspm = Math.round((cspmSum / this.profiles.length)*100)/100;;
      product.young = Math.round((youngSum / this.profiles.length)*100)/100;;
      product.adult = Math.round((adultSum / this.profiles.length)*100)/100;;
      product.old = Math.round((oldSum / this.profiles.length)*100)/100;;
    }
    this.updateDistances();
    console.log(this.profile);
  }

  getDistanceBetweenProductAndProfile(product : Product) {
    var man = this.profile.man - product.man;
    var woman = this.profile.woman - product.woman;
    var cspp = this.profile.cspp - product.cspp;
    var cspm = this.profile.cspm - product.cspm;
    var young = this.profile.young - product.young;
    var adult = this.profile.adult - product.adult;
    var old = this.profile.old - product.old;
    var distance = Math.sqrt( man*man + woman*woman + cspp*cspp + cspm*cspm + young*young + adult*adult + old*old);
    product.distance = distance;
    return distance;
  }

  sortProductsByDistance() : Product[] {
    return this.products.sort(function(a, b) {return a.distance - b.distance});
  }

  get filterByFloat() : Product[] {
    return this.products.filter( p => p.float === true);
  }

  get filterByNonFloat() : Product[] {
    return this.products.filter( p => p.float === false);
  }

  updateProduct(product : Product) {
    let newValue = this.productForm.value;
    product.man = newValue.man;
    product.woman = newValue.woman;
    product.cspp = newValue.cspp;
    product.cspm = newValue.cspm;
    product.young = newValue.young;
    product.adult = newValue.adult;
    product.old = newValue.old;
    this.pushNotificationService.sendNotificationToTheServer(product).subscribe();
    this.updateDistances();
  }

  getColor(i) : string {
    if(i === 0) return "primary";
    else if (i === 1) return "accent";
    else return "warn";
  }

  updateDistances() {
    this.products.map(p => {
      this.getDistanceBetweenProductAndProfile(p);
    });
    this.sortProductsByDistance();
    this.proposedProducts = this.products.slice(0, 5);
  }
}