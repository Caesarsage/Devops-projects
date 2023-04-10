import { Request, Response, NextFunction } from 'express';
import { version } from 'mongoose';
import { Unauthorized } from '../middleware/error-handler/401';

import { PageNotFound } from '../middleware/error-handler/404';
import { PostUpdatedPublisher } from '../middleware/events-handler/publishers/post-events-publisher';
import { natsEventClass } from '../middleware/events-handler/custom-pubsub-config/nats-event-class';

import { Post } from '../models/posts';

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return next(new PageNotFound());
        }

        if (post.userId !== req.loggedInUser!.id) {
            return next(new Unauthorized());
        };

        post.set({
            post: req.body.post
        });

        await post.save();

        await new PostUpdatedPublisher(natsEventClass.client).publishSync({
            id: post.id,
            post: post.post,
            userId: post.userId,
            version: post.version
        });

        return res.status(200).json(post);
    } catch (err) {
        console.log(err);
        return next(new Error());
    }
}