import { Request, Response, NextFunction } from 'express';

import { PageNotFound } from '../middleware/error-handler/404';
import { Comment } from '../models/comments';

export const getAllComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comments = await Comment.find().populate('post');

        if (!comments) {
            return next(new PageNotFound());
        }

        return res.status(200).json(comments);
    } catch (err) {
        console.log(err);
        return next(new Error());
    }
}