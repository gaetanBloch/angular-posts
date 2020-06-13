import { Component, OnDestroy, OnInit } from '@angular/core';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  private postsSubscription = new Subscription();
  posts: Post[] = [];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getPosts();
    this.postsSubscription = this.postService.getPostUpdateListener()
      .subscribe(posts => {
          this.posts = posts;
        }
      );
  }

  onDelete = (postId): void => {
    this.postService.deletePost(postId);
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }
}
