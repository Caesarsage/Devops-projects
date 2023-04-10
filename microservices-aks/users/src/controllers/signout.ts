import { Request, Response, NextFunction } from "express";

export const postSignout = async (
   req: Request,
   res: Response,
   next: NextFunction
   ) => {
    try {
        req.session = null;
        return res.status(200).json({
            loggedInUser: null,
        });
    } catch (err) {
        return next(new Error());
    }
};