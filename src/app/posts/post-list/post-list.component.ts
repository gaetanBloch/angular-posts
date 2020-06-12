import { Component, Input, OnInit } from '@angular/core';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() posts: Post[] = [];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
  }
}
