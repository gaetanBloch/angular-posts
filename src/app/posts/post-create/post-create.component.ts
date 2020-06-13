import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @ViewChild('form', { static: true }) form: NgForm;
  postForm: FormGroup;

  constructor(private postService: PostService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.postForm = this.fb.group(
      {
        title: ['', [Validators.required, Validators.minLength(5)]],
        content: ['', Validators.required, Validators.minLength(5)]
      }
    );
  }

  get title() {
    return this.postForm.get('title');
  }

  get content() {
    return this.postForm.get('content');
  }

  onAddPost = (): void => {
    this.postService.addPost(this.postForm.value.title, this.postForm.value.content);
    this.form.resetForm();
  };
}
