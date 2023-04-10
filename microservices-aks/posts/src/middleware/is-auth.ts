import { Request, Response, NextFunction } from "express";

import { Unauthorized } from "./error-handler/401";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.loggedInUser) {
        throw new Unauthorized();
    }
    next();
}