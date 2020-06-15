import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Post } from './post.model';
import { URL_PREFIX } from '../utils';
import { User } from '../auth/user.model';

const URL_POSTS = URL_PREFIX + 'feed/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[], postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getPosts = (postsPerPage: number, currentPage: number): void => {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{ posts: Post[], totalItems: number }>
    (URL_POSTS + queryParams)
      .pipe(
        map(response => ({
            posts: response.posts.map(post => ({
              ...post,
              imageUrl: URL_PREFIX + post.imageUrl
            })),
            maxPosts: response.totalItems
          })
        ))
      .subscribe(postsData => {
        this.posts = postsData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: postsData.maxPosts
        });
      });
  };

  getPost = (postId): Observable<Post> => {
    const post = this.posts.find(p => p._id === postId);
    if (post) {
      return of({ ...post });
    } else {
      return this.http.get<{ post: Post }>(URL_POSTS + '/' + postId)
        .pipe(map(response => ({
          ...response.post,
          imageUrl: URL_PREFIX + response.post.imageUrl
        })));
    }
  };

  addPost = (title: string, content: string, image: File): void => {
    const postData = this.createFormData(title, content, image);
    this.http.post<{ post: Post, creator: User }>(URL_POSTS, postData)
      .subscribe(() => {
        this.router.navigate(['']);
      });
  };

  updatePost = (postId: string,
                title: string,
                content: string,
                image: File | string): void => {

    // We have to differentiate if we get a File or simply the image URL string
    let postData: FormData | Post;
    if (typeof image === 'object') {
      postData = this.createFormData(title, content, image, postId);
    } else {
      postData = { _id: postId, title, content, image };
    }

    this.http.put<{ post: Post }>(URL_POSTS + '/' + postId, postData)
      .subscribe(() => {
        this.router.navigate(['']);
      });
  };

  deletePost = (postId: string): Observable<any> => {
    return this.http.delete(URL_POSTS + '/' + postId);
  };

  getPostUpdateListener = (): Observable<{ posts: Post[], postCount: number }> => {
    return this.postsUpdated.asObservable();
  };

  private createFormData = (title, content, image, id = null): FormData => {
    const postData = new FormData();
    postData.append('_id', id);
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    return postData;
  };
}
