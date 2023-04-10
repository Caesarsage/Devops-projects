import express from 'express';
import { body, check } from 'express-validator';


import { deleteComment } from '../controllers/delete-comment';


import { isAuth } from '../middleware/is-auth';
import { reqValidatorResult } from "../middleware/error-handler/validator-result";

const router = express.Router();

router.delete('/api/comments/id/:commentId', isAuth, [
    check('commentId')
        .isMongoId()
        .withMessage('Invalid comment id'),
    body('postId')
        .isMongoId()
        .withMessage('Invalid post id')
], reqValidatorResult, deleteComment);

export { router as deleteCommentRouter };