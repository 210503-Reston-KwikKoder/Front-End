import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Forum } from 'src/Models/Forum';
import { ForumService } from 'src/Services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  newForum: Forum[] = [];
  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.forumService.GetForumTitles().then(
      res => {
        this.newForum = res;
      }
    );
  }
}
