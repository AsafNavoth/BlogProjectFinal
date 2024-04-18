import { PostDataAccess } from '../DAL/PostDataAccess';
import Post from '../models/Post';

export class PostServices {
    private postDataAccess: PostDataAccess;

    constructor(postDataAccess: PostDataAccess) {
        this.postDataAccess = postDataAccess;
    }

    async addPost(post: Post): Promise<void> {
        try {
            await this.postDataAccess.addPost(post);
        } catch (error) {
            throw new Error(`Unable to add Post: ${(error as Error).message}`);
        }
    }

    async getPost(postId: number): Promise<Post> {
        const Post = await this.postDataAccess.getPostById(postId);
        if (!Post) {
            throw new Error(`Post with ID ${postId} not found`);
        }
        return Post;
    }

    async getAllPosts(category: string, contentFilter: string, userFilter: string,
                      limit: number, start: number): Promise<Array<Post>> {
        const allPosts = await this.postDataAccess.getAllPosts(category, contentFilter, userFilter, limit, start);
        if (allPosts.length === 0) {
            throw new Error(`No posts found`);
        }
        return allPosts;
    }

    async getPostCount(category: string): Promise<Number> {
        const postCount = await this.postDataAccess.getPostCount(category);
        if (!postCount) {
            throw new Error(`No posts found`);
        }
        return postCount;
    }

    async updatePost(postId: number, updateData: Partial<Post>): Promise<void> {
        try {
            await this.postDataAccess.updatePost(postId, updateData);
        } catch (error) {
            throw new Error(`Unable to update Post: ${(error as Error).message}`);
        }
    }

    async deletePost(postId: number): Promise<void> {
        try {
            await this.postDataAccess.deletePost(postId);
        } catch (error) {
            throw new Error(`Unable to delete Post: ${(error as Error).message}`);
        }
    }
}
