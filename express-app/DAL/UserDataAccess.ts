// import User from "../models/User";

import User from "../models/User";

export interface UserDataAccess {
    addUser(user: any): Promise<void>,
    findUser(user: any): Promise<User>

}