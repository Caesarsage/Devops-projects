import express from "express";

import { activeUserController } from "../controllers/active-user";
import { checkUserState } from "../middleware/loggedin-user";

const router = express.Router();

router.get(
  "/api/users/activeuser",
  checkUserState,
  activeUserController
);

export { router as activeUserRouter };
