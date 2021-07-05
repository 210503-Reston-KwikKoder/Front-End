export interface ForumPost{
    postID: number;
    topic: string;
    userName: string;
    imgURL: string;
    isUser: boolean;
    dateCreated: Date;
    description: string,
    forumID: number
}