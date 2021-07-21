import { ForumComponent } from "src/app/pages/forum/forum.component";

export interface ForumPost{
    postID: number;
    topic: string;
    userName: string;
    imgURL: string;
    isUser: boolean;
    dateCreated: Date | any;
    description: string;
    forumID: number;
    comments: ForumComponent[] | any[];
}