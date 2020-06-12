import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  title = '';
  content = '';
  @Output() postCreated = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onAddPost = (): void => {
    const post = {
      title: this.title,
      content: this.content
    };
    this.postCreated.emit(post);
  };
}
