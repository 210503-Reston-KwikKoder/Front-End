export interface ForumComment{
    commentID: number;
    postID: number;
    userName: string;
    ImgURL: string;
    created: Date;
    message: string;
    isLoggedUser: boolean;
}