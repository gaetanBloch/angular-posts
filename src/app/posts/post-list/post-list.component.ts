import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  private postsSubscription = new Subscription();
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 10;
  postsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, 1);
    this.postsSubscription = this.postService.getPostUpdateListener()
      .subscribe(posts => {
          this.isLoading = false;
          this.posts = posts;
        }
      );
  }

  onDelete = (postId): void => {
    this.postService.deletePost(postId);
  };

  onPageChanged = (pageData: PageEvent) => {

  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }
}
