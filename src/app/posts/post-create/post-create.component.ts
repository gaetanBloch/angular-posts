import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  post: Post;
  isLoading = false;

  constructor(private postService: PostService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
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
        this.isLoading = true;
        this.postService.getPost(postId).subscribe(post => {
          this.isLoading = false;
          this.post = post;
          this.postForm.patchValue({
            title: this.post.title,
            content: this.post.content
          });
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

  onSavePost = (): void => {
    this.isLoading = true;
    if (this.editMode) {
      this.postService.updatePost(
        this.post._id,
        this.postForm.value.title,
        this.postForm.value.content
      );
    } else {
      this.postService.addPost(
        this.postForm.value.title,
        this.postForm.value.content
      );
    }

    this.router.navigate(['/']);
  };
}
