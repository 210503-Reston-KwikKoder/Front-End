export interface ForumComment{
    commentID: number;
    postID: number;
    userName: string;
    ImgURL: string;
    created: Date | any;
    message: string;
    isLoggedUser: boolean;
}