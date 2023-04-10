import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { User } from "../models/user";

export const postSignup = async (
   req: Request,
   res: Response,
   next: NextFunction
   ) => {

    const { email, password } = req.body;    
    
    try {
        const user = User.build({ email, password });

        await user.save();
        
        const userJwt = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_KEY!
        );

        req.session = {
            jwt: userJwt,
        };

        return res.status(201).json(user);

    } catch (err) {
        console.log(err, 'Error in User Creation Function');
        next(new Error());
    }
}; 