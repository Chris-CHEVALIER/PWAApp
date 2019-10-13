import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyAngularTest';
  onButtonClicked(evt: MouseEvent) {
    if(this.title == 'Bob Le Bricoleur') this.title = "MyAngularTest";
    else if(this.title == 'MyAngularTest') this.title = "Bob Le Bricoleur";
  }
}