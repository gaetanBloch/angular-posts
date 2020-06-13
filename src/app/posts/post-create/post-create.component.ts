import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  postForm: FormGroup;
  editMode = false;
  postId: string;

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
        this.postId = paramMap.get('postId');
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
