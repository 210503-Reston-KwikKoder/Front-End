import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ForumPost } from 'src/Models/ForumPost';
import { ForumService } from 'src/Services/forum.service';

//FontAwesome
import { faTrashAlt, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { ForumComment } from 'src/Models/ForumComment';

@Component({
  selector: 'app-forumposts',
  templateUrl: './forumposts.component.html',
  styleUrls: ['./forumposts.component.css']
})
export class ForumpostsComponent implements OnInit {
  //FontAwesome
  faTrashAlt = faTrashAlt;
  faCommentDots = faCommentDots;

  //app variables
  profileJson: string = null;
  id: number;
  isShow: boolean[] = [];
  posts: ForumPost[] = [];
  comments: ForumComment[] = [];
  newPost: ForumPost = {
    postID: 0,
    topic: '',
    userName: '',
    imgURL: '',
    dateCreated: new Date,
    isUser: false,
    description: '',
    forumID: 0
  };
  newComment: ForumComment = {
    commentID: 0,
    postID: 0,
    userName: '',
    ImgURL: '',
    created: new Date,
    message: '',
    isLoggedUser: false
}
  constructor(public auth: AuthService, private forumService: ForumService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );
    this.auth.idTokenClaims$.subscribe(
      claims => (console.log(claims))
    );
    this.route.params.subscribe(
      params =>{
        this.id = params['id'];
      }
    );
    this.forumService.GetForumTitlesById(this.id).then(
      res => {
        this.newPost.topic = res.topic;
      }
    );
    this.forumService.GetForumPostsById(this.id).then(
      res => {
        this.posts = res;
      }
    )
  }
  getComments(postId, i): void{
    this.isShow[i] = !this.isShow[i];
    if(this.isShow[i]){
      this.forumService.GetForumCommentsById(postId).then(
        res => {
          console.log('comments received*******',res);
          this.comments = res;
        }
      );
    }
  }
  onSubmit():void{
    this.newPost.forumID = this.id;
    this.forumService.AddPost(this.newPost).then(
      res => {
        this.forumService.GetForumPostsById(this.id).then(
          res=>{
            this.posts = res;
          }
        )
        this.newPost.description = '';
      }
    );
  }
  onSubmitComment(postId): void{
    this.newComment.postID = postId;
    this.forumService.ForumComment(this.newComment).then(
      res => {
        console.log('submitted');
        this.newComment.message = '';
        this.forumService.GetForumCommentsById(postId).then(
          res => {
            console.log(res);
            this.comments = res;
          }
        );
      }
    )
  }
  deletePost(deletePost, postId): void{
    if(deletePost == true){
      this.forumService.deletePost(postId).then(
        ()=>{
          console.log('deleted');
          this.forumService.GetForumPostsById(this.id).then(
            res=>{
              this.posts = res;
            }
          )
        }
      )
    }
  }
  deleteComment(isUser, commentId, postId): void{
    console.log(isUser);
    if(isUser == true){
      this.forumService.deletePostComment(commentId).then(
        () => {
          console.log('deleted');
          this.forumService.GetForumCommentsById(postId).then(
            res => {
              console.log(res);
              this.comments = res;
            }
          );
        }
      )
    }
  }
}
