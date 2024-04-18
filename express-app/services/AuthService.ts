import {OAuth2Client} from "google-auth-library";
import {UserDataAccess} from "../DAL/UserDataAccess";
// import User from "../models/User";


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export class AuthService {
    private userDataAccess: UserDataAccess;

    constructor(userDataAccess: UserDataAccess) {
        this.userDataAccess = userDataAccess;
    }

    async verifyGoogleToken(token: any) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: GOOGLE_CLIENT_ID,
            });
            return {payload: ticket.getPayload()};
        } catch (error) {
            return {error: "Invalid user detected. Please try again"};
        }
    }
}
