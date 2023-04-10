import { Request, Response, NextFunction } from "express";

import { PageNotFound } from "../middleware/error-handler/404";
import { Post } from "../models/posts";

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return next(new PageNotFound());
        }

        return res.status(200).json(post);
    } catch (err) {
        console.log(err);
        return next(new Error());
    }
};