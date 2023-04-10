import { Request, Response, NextFunction } from 'express';

import { Post } from '../models/posts';

export const getAllPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = await Post.find().sort({ createdAt: -1 });

        return res.status(200).json(post);
    } catch (err) {
        console.log(err);
        return next(new Error());
    }
}