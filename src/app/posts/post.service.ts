import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {
  }

  getPosts = (): void => {
    this.http.get<{ posts: Post[] }>('http://localhost:8080/feed/posts')
      .subscribe(response => {
        this.posts = response.posts;
        this.notifyPostsUpdate();
      });
  };

  getPost = (postId): Post => {
    return { ...this.posts.find(post => post._id === postId) };
  };

  addPost = (title: string, content: string): void => {
    const post = new Post(title, content);
    this.http.post<{ post: Post }>('http://localhost:8080/feed/posts', post)
      .subscribe(response => {
        console.log(response);
        post._id = response.post._id;
        this.posts.push(post);
        this.notifyPostsUpdate();
      });
  };

  updatePost = (postId: string, title: string, content: string): void => {
    const post = new Post(title, content);
    this.http.put('http://localhost:8080/feed/posts/' + postId, post)
      .subscribe(response => {
        console.log(response);
        const updatedPost = this.posts.find(p => p._id === postId);
        updatedPost.title = title;
        updatedPost.content = content;
        this.notifyPostsUpdate();
      });
  };

  deletePost = (postId: string): void => {
    this.http.delete('http://localhost:8080/feed/posts/' + postId)
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
