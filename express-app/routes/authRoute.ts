import express, {Request, Response} from "express";
import {AuthController} from "../Controllers/AuthController";
import {UserServices} from "../services/UserServices";
import {UserDataAccessSQL} from "../DAL/SQL/UserDataAccessSQL";
import {AuthService} from "../services/AuthService";

const router = express.Router();
const authController = new AuthController(new AuthService(new UserDataAccessSQL()), new UserServices(new UserDataAccessSQL()));

router.post('/sign-in', async (req: Request, res: Response) => await authController.signIn(req, res));
export default router;
