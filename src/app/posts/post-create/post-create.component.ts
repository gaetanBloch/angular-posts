import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  title = '';
  content = '';
  @Output() postCreated = new EventEmitter<Post>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onAddPost = (): void => {
    this.postCreated.emit(new Post(this.title, this.content));
  };
}
