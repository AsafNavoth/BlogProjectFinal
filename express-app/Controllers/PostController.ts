import {Request, Response} from 'express';
import Post from '../models/Post';
import {PostServices} from '../services/PostServices';

export class PostController {

    private postBL: PostServices;

    constructor(postBL: PostServices) {
        this.postBL = postBL;
    }

    async addPost(req: Request, res: Response): Promise<void> {
        const postData = req.body;

        const post = new Post(NaN, postData.post_title, postData.posted_by, postData.publish_date, postData.post_blurb,
            postData.post_category, postData.img_address);
        try {
            await this.postBL.addPost(post);
            res.status(201).send({message: `Post created successfully`});
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async getPost(req: Request, res: Response): Promise<void> {
        const postId = +req.params.id;
        try {
            const post = await this.postBL.getPost(postId);
            res.status(200).send(post);
        } catch (error) {
            res.status(400).send((error as Error).message);
            console.log(error)
        }
    }

    async getAllPosts(req: Request, res: Response): Promise<void> {
        try {
            const category: string = <string>req.query.category;
            const contentFilter: string = <string>req.query.contentFilter;
            const userFilter: string = <string>req.query.userFilter;
            const limit: number = parseInt(<string>req.query.limit);
            const start: number = parseInt(<string>req.query.start)


            const allPosts = await this.postBL.getAllPosts(category, contentFilter, userFilter, limit, start);

            res.status(200).send(allPosts);
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async getPostCount(req: Request, res: Response): Promise<void> {
        const category: string = <string>req.query.category
        try {
            const postCount = await this.postBL.getPostCount(category);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({count: postCount});
        } catch (error) {
            res.status(400).send((error as Error).message);
            console.log(error)
        }
    }

    async updatePost(req: Request, res: Response): Promise<void> {
        const postId = +req.params.id;
        const postData = req.body;
        try {
            await this.postBL.updatePost(postId, postData);
            res.status(200).send({message: `Post ${postId} updated successfully`});
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async deletePost(req: Request, res: Response): Promise<void> {
        const postId = +req.params.id;
        try {
            await this.postBL.deletePost(postId);
            res.status(200).send({message: `Post ${postId} deleted successfully`});
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

}
