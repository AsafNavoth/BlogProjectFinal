import {Request, Response} from 'express';
// import User from '../models/User';
import {UserServices} from '../services/UserServices';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import {AuthService} from "../services/AuthService";


dotenv.config();

export class AuthController {

    private authBL: AuthService;
    private userBL: UserServices

    constructor(authBL: AuthService, userBL: UserServices) {
        this.authBL = authBL;
        this.userBL = userBL
    }


    async signIn(req: Request, res: Response): Promise<void> {
        try {
            if (req.body.credential) {
                const verificationResponse = await this.authBL.verifyGoogleToken(req.body.credential);

                if (verificationResponse.error) {
                    res.status(400).json({
                        message: verificationResponse.error,
                    });
                }


                const profile = verificationResponse?.payload;
                // @ts-ignore
                const existsInDB = await this.userBL.findUser(profile.email);
                if (!existsInDB) {
                    await this.userBL.addUser(profile);
                }

                res.status(201).json({
                    message: "Sign-in was successful",
                    user: {
                        firstName: profile?.given_name,
                        lastName: profile?.family_name,
                        picture: profile?.picture,
                        email: profile?.email,
                        // @ts-ignore
                        token: jwt.sign({email: profile?.email}, process.env.JWT_SECRET, {
                            expiresIn: "1d",
                        }),
                    },
                });
            }
        } catch (error) {
            res.status(500).json({
                // @ts-ignore
                message: error?.message || error,
            });
        }
    }
}

