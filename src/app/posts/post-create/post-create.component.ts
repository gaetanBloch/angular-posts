import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  // @ViewChild('form', { static: true }) form: NgForm;
  form: FormGroup;

  constructor(private postService: PostService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        title: ['', [Validators.required, Validators.minLength(3)]],
        content: ['', Validators.required]
      }
    );
  }

  get title() {
    return this.form.get('title');
  }

  get content() {
    return this.form.get('content');
  }

  onAddPost = (): void => {
    this.postService.addPost(this.form.value.title, this.form.value.content);
    this.form.reset();
  };
}
