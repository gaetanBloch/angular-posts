import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';
import { map } from 'rxjs/operators';

const URL_PREFIX = 'http://localhost:8080/';
const URL_POSTS = URL_PREFIX + 'feed/posts/';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {
  }

  getPosts = (): void => {
    this.http.get<{ posts: Post[] }>(URL_POSTS)
      .subscribe(response => {
        this.posts = response.posts.map(post => ({
          ...post,
          imageUrl: URL_PREFIX + post.imageUrl
        }));
        this.notifyPostsUpdate();
      });
  };

  getPost = (postId): Observable<Post> => {
    const post = this.posts.find(p => p._id === postId);
    if (post) {
      return new Observable<Post>(observer => {
        observer.next({ ...post });
        observer.complete();
      });
    } else {
      return this.http.get<{ post: Post }>(URL_POSTS + postId)
        .pipe(map(response => ({
          ...response.post,
          imageUrl: URL_PREFIX + response.post.imageUrl
        })));
    }
  };

  addPost = (title: string, content: string, image: File): void => {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http.post<{ post: Post }>(URL_POSTS, postData)
      .subscribe(response => {
        console.log(response);
        this.posts.push(response.post);
        this.notifyPostsUpdate();
      });
  };

  updatePost = (postId: string, title: string, content: string): void => {
    const post: Post = { _id: postId, title, content, imageUrl: ''};
    this.http.put(URL_POSTS + postId, post)
      .subscribe(response => {
        console.log(response);
        const updatedPosts = [...this.posts];
        const updatedPostIndex = updatedPosts.findIndex(p => p._id === postId);
        updatedPosts[updatedPostIndex] = post;
        this.posts = updatedPosts;
        this.notifyPostsUpdate();
      });
  };

  deletePost = (postId: string): void => {
    this.http.delete(URL_POSTS + postId)
      .subscribe(response => {
        console.log(response);
        this.posts = this.posts.filter(post => post._id !== postId);
        this.notifyPostsUpdate();
      });
  };

  getPostUpdateListener = (): Observable<Post[]> => {
    return this.postsUpdated.asObservable();
  };

  private notifyPostsUpdate = () => {
    this.postsUpdated.next([...this.posts]);
  };
}
