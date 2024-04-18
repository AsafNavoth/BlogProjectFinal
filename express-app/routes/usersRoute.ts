import express, {Request, Response} from "express";
import {UserServices} from "../services/UserServices";
import {UserDataAccessSQL} from "../DAL/SQL/UserDataAccessSQL";
import {UserController} from "../Controllers/UserController";

const router = express.Router();
const userController = new UserController(new UserServices(new UserDataAccessSQL()));

router.post('/', async (req: Request, res: Response) => await userController.addUser(req,res));
router.get("/:id", async (req: Request, res: Response) => await userController.findUser(req, res));

export default router;
