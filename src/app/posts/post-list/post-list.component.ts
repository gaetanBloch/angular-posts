import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  private postsSubscription = new Subscription();
  private authStatusSubscription = new Subscription();
  isAuthenticated = false;
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userId: string;

  constructor(private postService: PostService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getPosts();
    this.postsSubscription = this.postService.getPostUpdateListener()
      .subscribe(postsData => {
          this.isLoading = false;
          this.posts = postsData.posts;
          this.totalPosts = postsData.postCount;
        }
      );
    this.authStatusSubscription = this.authService.getAuthStatusListener()
      .subscribe(isAuth => {
        this.isAuthenticated = isAuth;
        this.userId = this.authService.getUserId();
      });
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userId = this.authService.getUserId();
  }

  onDelete = (postId): void => {
    this.isLoading = true;
    this.postService.deletePost(postId)
      .subscribe(
        () => this.getPosts(),
        () => this.isLoading = false);
  };

  onPageChanged = (pageData: PageEvent) => {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.getPosts();
  };

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    if (this.authStatusSubscription) {
      this.authStatusSubscription.unsubscribe();
    }
  }

  private getPosts = () => {
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  };
}
