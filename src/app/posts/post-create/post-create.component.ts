import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PostService } from '../post.service';
import { Post } from '../post.model';
import { mimeType } from './mime-type.validation';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {
  private authStatusSubscription = new Subscription();
  postForm: FormGroup;
  editMode = false;
  post: Post;
  isLoading = false;
  imagePreview: string;

  constructor(private postService: PostService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.postForm = this.fb.group(
      {
        title: [null, [Validators.required, Validators.minLength(5)]],
        content: [null, [Validators.required, Validators.minLength(5)]],
        image: [null, [Validators.required], mimeType]
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
            content: this.post.content,
            image: this.post.imageUrl
          });
        });
      }
    });

    this.authStatusSubscription = this.authService.getAuthStatusListener()
      .subscribe(() => this.isLoading = false);
  }

  get title() {
    return this.postForm.get('title');
  }

  get content() {
    return this.postForm.get('content');
  }

  get image() {
    return this.postForm.get('image');
  }

  onSavePost = (): void => {
    this.isLoading = true;
    if (this.editMode) {
      this.postService.updatePost(
        this.post._id,
        this.postForm.value.title,
        this.postForm.value.content,
        this.postForm.value.image
      );
    } else {
      this.postService.addPost(
        this.postForm.value.title,
        this.postForm.value.content,
        this.postForm.value.image
      );
    }
  };

  onImagePicked = (event: Event): void => {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({ image: file });
    this.image.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  ngOnDestroy(): void {
    if (this.authStatusSubscription) {
      this.authStatusSubscription.unsubscribe();
    }
  }
}
