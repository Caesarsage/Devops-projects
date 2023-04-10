import { Request, Response, NextFunction } from "express";
import { natsEventClass } from "../middleware/events-handler/custom-pubsub-config/nats-event-class";
import { PostCreatedPublisher } from "../middleware/events-handler/publishers/post-events-publisher";


import { Post } from "../models/posts";

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const { post } = req.body;

  try {
    const newPost = await Post.build({
        post,
        userId: req.loggedInUser!.id
    });

    await newPost.save();

    await new PostCreatedPublisher(natsEventClass.client).publishSync({
      id: newPost.id,
      post: newPost.post,
      userId: newPost.userId,
      version: newPost.version
    });

    return res.status(201).json(newPost);

    } catch (err) {
        console.log(err, 'Error in Post Creation Function');
        next(err);
    }
  };
