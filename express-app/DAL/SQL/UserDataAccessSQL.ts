import {UserDataAccess} from "../UserDataAccess";
import {Client} from "pg";
import {getClient} from "../../dbconnect";
// import User from "../../models/User";

export class UserDataAccessSQL implements UserDataAccess {

    private client: Client;

    constructor() {
        this.client = getClient()
    }

    async addUser(user: any): Promise<void> {
        const query = 'INSERT INTO userdata (user_name, email)' +
            ' VALUES ($1, $2)';
        await this.client.query(query, [user.name, user.email]);
    }

    async findUser(userEmail: string): Promise<any> {
        const query = 'SELECT * FROM userdata' +
            ' WHERE email = $1'
        const result = await this.client.query(query, [userEmail])

        return result.rows[0]

    }
}