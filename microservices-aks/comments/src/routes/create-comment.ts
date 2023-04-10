import express from 'express';
import { body, check } from 'express-validator';


import { createComment } from '../controllers/create-comment';
import { isAuth } from '../middleware/is-auth';
import { reqValidatorResult } from "../middleware/error-handler/validator-result";

const router = express.Router();

router.post('/api/comments/:postId', isAuth, [
    body('comment')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Content must be at least 3 characters long'),
    check('postId')
        .isMongoId()
        .withMessage('Invalid post id')
], reqValidatorResult, createComment);

export { router as createCommentRouter };