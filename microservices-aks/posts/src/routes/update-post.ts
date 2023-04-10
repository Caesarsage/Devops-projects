import express from 'express';
import { body } from 'express-validator';


import { updatePost } from '../controllers/update-post';


import { isAuth } from '../middleware/is-auth';
import { reqValidatorResult } from "../middleware/error-handler/validator-result";

const router = express.Router();

router.put('/api/posts/:id', isAuth, [
    body('post')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Content must be at least 3 characters long'),
], reqValidatorResult, updatePost);

export { router as updatePostRouter };