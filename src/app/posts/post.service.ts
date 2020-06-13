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
        this.postsUpdated.next([...this.posts]);
      });
  }

  addPost = (title: string, content: string): void => {
    const post = new Post(title, content);
    this.http.post('http://localhost:8080/feed/posts', post)
      .subscribe(response => {
        console.log(response);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener = (): Observable<Post[]> => {
    return this.postsUpdated.asObservable();
  }
}
