import Post from "../models/Post";

export interface PostDataAccess {
    addPost(post: Post): Promise<void>,

    deletePost(postId: number): Promise<void>,

    updatePost(postId: number, updateData: Partial<Post>): Promise<void>,

    getPostById(postId: number): Promise<Post>

    getAllPosts(category: string, contentFilter: string, userFilter: string, limit: number, start: number): Promise<Array<Post>>

    getPostCount(category: string): Promise<Number>
}