import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { PasswordHandler } from "../services/password-handler";

export const postSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const isValidPassword = await PasswordHandler.compare(
        password,
        user.password
      );

      if (!isValidPassword) {
        return next(new Error());
      }

      const userToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!,
        { expiresIn: "1h" }
      );

      req.session = { jwt: userToken };

      res.status(200).json({
        message: "Signin successful",
        userToken,
        user: {
          id: user.id,
          email: user.email,
        },
      });
    }
  } catch (err) {
    console.log(err, "Error validating your credentials, please try again");
    next(new Error());
  }
};
