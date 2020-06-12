import { Injectable } from '@angular/core';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];

  constructor() {
  }

  getPosts = (): Post[] => {
    return [...this.posts];
  }

  addPost = (title: string, content: string): void => {
    this.posts.push(new Post(title, content));
  }
}
