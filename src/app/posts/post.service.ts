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
    this.http.get<{ message: string, posts: Post[] }>
    ('http://localhost:8080/feed/posts')
      .subscribe(response => {
        this.posts = response.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  addPost = (title: string, content: string): void => {
    this.posts.push(new Post(title, content));
    this.postsUpdated.next([...this.posts]);
  }

  getPostUpdateListener = (): Observable<Post[]> => {
    return this.postsUpdated.asObservable();
  }
}
