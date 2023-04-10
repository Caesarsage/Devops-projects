import { Request, Response, NextFunction } from 'express';

import { PageNotFound } from '../middleware/error-handler/404';
import { Post } from '../models/posts';

export const getAllPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await Post.find();

        if (!posts) {
            return next(new PageNotFound());
        }

        return res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        return next(new Error());
    }
}