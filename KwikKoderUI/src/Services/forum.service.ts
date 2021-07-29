import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Forum } from 'src/Models/ForumModel';
import { ForumComment } from 'src/Models/ForumComment';
import { ForumPost } from 'src/Models/ForumPostModel';
import {environment as env} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpClient) { }
  AddPost(forumPost): Promise<ForumPost>{
    return this.http.post<ForumPost>(`${env.dev.forumApi}ForumPost`, forumPost).toPromise();
  }
  GetForumTitles(): Promise<Forum[]>{
    return this.http.get<Forum[]>(`${env.dev.forumApi}Forum`).toPromise();
  }
  GetForumTitlesById(id): Promise<Forum>{
    return this.http.get<Forum>(`${env.dev.forumApi}Forum/${id}`).toPromise();
  }
  GetForumPostsById(id): Promise<ForumPost[]>{
    return this.http.get<ForumPost[]>(`${env.dev.forumApi}ForumPost/${id}`).toPromise();
  }
  deletePost(deletePostId): Promise<void>{
    return this.http.delete<void>(`${env.dev.forumApi}ForumPost/${deletePostId}`).toPromise();
  }
  ForumComment(forumComment): Promise<ForumComment>{
    return this.http.post<ForumComment>(`${env.dev.forumApi}comment`, forumComment).toPromise();
  }
  GetForumCommentsById(id): Promise<ForumComment[]>{
    return this.http.get<ForumComment[]>(`${env.dev.forumApi}comment/${id}`).toPromise();
  }
  deletePostComment(commentId): Promise<void>{
    return this.http.delete<void>(`${env.dev.forumApi}comment/${commentId}`).toPromise();
  }
}
