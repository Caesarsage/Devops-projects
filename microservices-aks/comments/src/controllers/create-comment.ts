import { Request, Response, NextFunction } from "express";

import { PageNotFound } from "../middleware/error-handler/404";
import { Post } from "../models/posts";
import { Comment } from "../models/comments";
import { CommentCreatedPublisher } from "../middleware/events-handler/publishers/comment-events-publisher";
import { natsEventClass } from "../middleware/events-handler/custom-pubsub-config/nats-event-class";

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  const { comment } = req.body;
  const { postId } = req.params;
  
  try {
    const postExist = await Post.findById(postId);
    
    if (!postExist) {
      return next(new PageNotFound());
    }

    const newComment = Comment.build({
      userId: req.loggedInUser!.id,
      post: postExist,
      comment
    });

    await newComment.save();
    
    // trigger save on dupPostDB to update the version count
    await postExist.save();

    await new CommentCreatedPublisher(natsEventClass.client).publishSync({
      id: newComment.id,
      comment: newComment.comment,
      version: newComment.version,
      userId: newComment.userId,
      post: {
        id: newComment.post.id,
      }
    });

    return res.status(201).json(newComment);

    } catch (err) {
        console.log(err, 'Error in Comment Creation Function');
        next(err);
    }
  };
