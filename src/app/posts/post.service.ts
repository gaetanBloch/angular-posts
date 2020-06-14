import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';
import { map } from 'rxjs/operators';

const URL_PREFIX = 'http://localhost:8080/';
const URL_POSTS = URL_PREFIX + 'feed/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {
  }

  getPosts = (postsPerPage: number, currentPage: number): void => {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{ posts: Post[], totalItems: number }>
    (URL_POSTS + queryParams)
      .pipe(
        map(response => response.posts.map(post => ({
            ...post,
            imageUrl: URL_PREFIX + post.imageUrl
          }))
        ))
      .subscribe(posts => {
        this.posts = posts;
        this.notifyPostsUpdate();
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
    this.http.post<{ post: Post }>(URL_POSTS, postData)
      .subscribe(response => {
        console.log(response);
        this.posts.push(response.post);
        this.notifyPostsUpdate();
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
      postData = { _id: postId, title, content, imageUrl: image };
    }

    this.http.put<{ post: Post }>(URL_POSTS + '/' + postId, postData)
      .subscribe(response => {
        console.log(response);
        const updatedPosts = [...this.posts];
        const updatedPostIndex = updatedPosts.findIndex(p => p._id === postId);
        updatedPosts[updatedPostIndex] = {
          ...response.post,
          imageUrl: URL_PREFIX + response.post.imageUrl
        };
        this.posts = updatedPosts;
        this.notifyPostsUpdate();
      });
  };

  deletePost = (postId: string): void => {
    this.http.delete(URL_POSTS + '/' + postId)
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

  private createFormData = (title, content, image, id = null): FormData => {
    const postData = new FormData();
    postData.append('_id', id);
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    return postData;
  };
}
