import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ForumPost } from 'src/Models/ForumPostModel';
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
  message: any[] = [];
  isShow: boolean[] = [];
  posts: ForumPost[] = [];
  newPost: ForumPost = {
    postID: 0,
    topic: '',
    userName: '',
    imgURL: '',
    dateCreated: new Date,
    isUser: false,
    description: '',
    forumID: 0,
    comments:[]
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
        console.log(this.posts);
        this.posts.forEach(element => {
          this.forumService.GetForumCommentsById(element.postID).then(
            res => { 
              console.log(res);
              element.comments = res;
            }
          )
        });
      }
    )
  }
  getComments(i): void{
    this.isShow[i] = !this.isShow[i];
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
    this.message.forEach(element => {
      console.log('input message is ********',element);
      this.newComment.message = element;
    });
    this.forumService.ForumComment(this.newComment).then(
      res => {
        console.log('submitted');
      this.newComment.message = '';
      this.posts.forEach(element => {
      this.forumService.GetForumCommentsById(element.postID).then(
        res =>{ 
          console.log(res);
          element.comments = res;
          this.message = [];
        }
      )
    });
  })
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
    if(isUser == true){
      this.forumService.deletePostComment(commentId).then(
        () => {
          console.log('deleted');
          this.posts.forEach(element => {
            this.forumService.GetForumCommentsById(element.postID).then(
              res =>{ 
                console.log(res);
                element.comments = res;
              }
            )
          });
        }
      )
    }
  }
}
