import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  movies;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    /*fetch('https://ghibliapi.herokuapp.com/films/?limit=10')
    .then((response) => response.json())
    .then((json) => {
      this.movies = json;
    });*/
    this.http.get('https://ghibliapi.herokuapp.com/films/?limit=10')
    .subscribe((json) => {
      this.movies = json;
      console.log(this.movies);
      
    });
  }

}
