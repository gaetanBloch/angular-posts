import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedPosts = [];

  onPostCreated = (post): void => {
    console.log(post);
    this.storedPosts.push(post);
  }
}
