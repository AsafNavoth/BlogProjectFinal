import express, { Request, Response } from 'express';
import { PostController } from '../Controllers/PostController';
import { PostServices } from '../services/PostServices';
import {PostDataAccessSQL} from "../DAL/SQL/PostDataAccessSQL";

const router = express.Router();
const postController = new PostController(new PostServices(new PostDataAccessSQL()));

router.post('/', async (req: Request, res: Response) => await postController.addPost(req,res));
router.get('/count', async (req: Request, res: Response) => await postController.getPostCount(req,res));
router.get('/:id', async (req: Request, res: Response) => await postController.getPost(req,res));
router.get('/', async (req: Request, res: Response) => await postController.getAllPosts(req,res));
router.put('/:id', async (req: Request, res: Response) => await postController.updatePost(req,res));
router.delete('/:id', async (req: Request, res: Response) => await postController.deletePost(req,res));

export default router;
