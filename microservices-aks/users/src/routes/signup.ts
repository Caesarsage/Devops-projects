import express from "express";
import { body, CustomValidator } from "express-validator";

import { reqValidatorResult } from "../middleware/error-handler/validator-result";

import { postSignup } from "../controllers/signup";
import { User } from "../models/user";

const router = express.Router();

//Check if email exists
const checkEmailExist: CustomValidator = async (value) => {
  try {
    const existingUser = await User.findOne({ email: value });
    if (existingUser) {
      return Promise.reject(
        "E-mail already exist! Please sign-in if you are a registered user."
      );
    }
  } catch (err) {
    throw new Error();
  }
};

router.post(
  "/api/users/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Provide a valid email")
      .custom(checkEmailExist),
    body("password")
      .trim()
      .isLength({ min: 6, max: 12 })
      .withMessage("Password must be between 6 and 12 characters"),
  ],
  reqValidatorResult,
  postSignup
);

export { router as signupRouter };
