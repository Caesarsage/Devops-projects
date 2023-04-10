import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { Unauthorized } from "./error-handler/401";

interface IUser {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      loggedInUser?: IUser;
    }
  }
}

export const checkUserState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    console.log(req.session?.jwt, "no jwt in session for this User");
    req.session = null;
    return next();
  }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as IUser;

    req.loggedInUser = payload;
  } catch (err) {
    console.log(err, "Invalid JWT in catch block of loggedInUser");
    req.session = null;
    return next(new Unauthorized())
  }
  next();
};
