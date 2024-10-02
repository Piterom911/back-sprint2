export type CommentResponseType = {
    id: string
    postId: string
    content: string
    commentatorInfo: CommentatorInfo,
    createdAt: string
}

export type CommentatorInfo = {
    userId: string
    userLogin: string
}
