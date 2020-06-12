import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @ViewChild('form', { static: true }) form: NgForm;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
  }

  onAddPost = (): void => {
    this.postService.addPost(this.form.value.title, this.form.value.content);
  };
}
