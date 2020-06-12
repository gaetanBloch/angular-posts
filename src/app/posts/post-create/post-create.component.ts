import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @Output() postCreated = new EventEmitter<Post>();
  @ViewChild('form', { static: true }) form: NgForm;

  constructor() {
  }

  ngOnInit(): void {
  }

  onAddPost = (): void => {
    this.postCreated.emit(new Post(
      this.form.value.title,
      this.form.value.content
    ));
  };
}
