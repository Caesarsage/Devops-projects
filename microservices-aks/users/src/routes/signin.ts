import express from "express";
import { body, CustomValidator } from "express-validator";

import { postSignin } from "../controllers/signin";
import { reqValidatorResult } from "../middleware/error-handler/validator-result";

import { User } from "../models/user";

const router = express.Router();

//checking if email is already in use
const checkEmailExist: CustomValidator = async (value) => {
  try {
    const existingUser = await User.findOne({ email: value });
    if (!existingUser) {
      return Promise.reject("Email or Password is incorrect");
    }
  } catch (err) {
    throw new Error();
  }
};

router.post(
  "/api/users/signin",
  [
    body("email")
      .isEmail()
      .withMessage("Provide a valid email")
      .custom(checkEmailExist),
    body("password").trim().notEmpty().withMessage("Password cannot be empty"),
  ],
  reqValidatorResult,
  postSignin
);

export { router as signinRouter };
