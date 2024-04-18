import {Request, Response} from 'express';
// import User from '../models/User';
import {UserServices} from '../services/UserServices';
import User from "../models/User";


export class UserController {

    private userBL: UserServices

    constructor(userBL: UserServices) {
        this.userBL = userBL
    }

    async addUser(req: Request, res: Response): Promise<void> {
        const userData = req.body;

        const user = new User(NaN, userData.name, userData.email);
        try {
            await this.userBL.addUser(user);
            res.status(201).send({message: `User added successfully`});
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async findUser(req: Request, res: Response): Promise<void> {
        const userId = req.body.email;
        try {
            const user = await this.userBL.findUser(userId);
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send((error as Error).message);
            console.log(error)
        }
    }
}

