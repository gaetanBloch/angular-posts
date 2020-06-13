import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  postForm: FormGroup;
  editMode = false;

  constructor(private postService: PostService,
              private fb: FormBuilder,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.postForm = this.fb.group(
      {
        title: ['', [Validators.required, Validators.minLength(5)]],
        content: ['', [Validators.required, Validators.minLength(5)]]
      }
    );

    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('postId')) {
        this.editMode = true;
        const postId = paramMap.get('postId');
        const post = this.postService.getPost(postId);
        this.postForm.patchValue({
          title: post.title,
          content: post.content
        });
      }
    });
  }

  get title() {
    return this.postForm.get('title');
  }

  get content() {
    return this.postForm.get('content');
  }

  onAddPost = (): void => {
    this.postService.addPost(
      this.postForm.value.title,
      this.postForm.value.content
    );
    this.form.resetForm();
  };
}
