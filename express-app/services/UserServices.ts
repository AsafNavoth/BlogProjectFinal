import {OAuth2Client} from "google-auth-library";
import {UserDataAccess} from "../DAL/UserDataAccess";
import Post from "../models/Post";
// import User from "../models/User";



export class UserServices {
    private userDataAccess: UserDataAccess;

    constructor(userDataAccess: UserDataAccess) {
        this.userDataAccess = userDataAccess;
    }

    async addUser(user: any): Promise<void> {
        try {
            await this.userDataAccess.addUser(user);
        } catch (error) {
            throw new Error(`Unable to add User: ${(error as Error).message}`);
        }
    }

    async findUser(email: string): Promise<any> {
        try {
             return await this.userDataAccess.findUser(email);
        } catch (error) {
            throw new Error(`Unable to find User: ${(error as Error).message}`)
        }
    }
}

