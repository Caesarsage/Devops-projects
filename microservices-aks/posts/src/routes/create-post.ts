import express from 'express';
import { body } from 'express-validator';


import { createPost } from '../controllers/create-post';


import { isAuth } from '../middleware/is-auth';
import { reqValidatorResult } from "../middleware/error-handler/validator-result";

const router = express.Router();

router.post('/api/posts', isAuth, [
    body('post')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Content must be at least 3 characters long'),
], reqValidatorResult, createPost);

export { router as createPostRouter };