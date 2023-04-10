import { Request, Response, NextFunction } from "express";
import { Unauthorized } from "../middleware/error-handler/401";

import { PageNotFound } from "../middleware/error-handler/404";

import { Post } from "../models/posts";
import { Comment } from "../models/comments";
import { CommentDeletedPublisher } from "../middleware/events-handler/publishers/comment-events-publisher";
import { natsEventClass } from "../middleware/events-handler/custom-pubsub-config/nats-event-class";

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { commentId } = req.params;
  const { postId } = req.body;

  try {
    const findPost = await Post.findById(postId);

    if (!findPost) {
      return next(new PageNotFound());
    }

    const commentToDelete = await Comment.findById(commentId).populate("post");

    if (!commentToDelete) {
      return next(new PageNotFound());
    }

    if (commentToDelete.userId !== req.loggedInUser!.id) {
      return next(new Unauthorized());
    }

    await commentToDelete.delete();

    // trigger save on dupPostDB to update the version count
    findPost.save();

    await new CommentDeletedPublisher(natsEventClass.client).publishSync({
      id: commentToDelete.id,
      comment: commentToDelete.comment,
      version: commentToDelete.version,
      userId: commentToDelete.userId,
      post: {
        id: commentToDelete.post.id,
      },
    });

    return res.status(200).json({ message: "Comment Deleted" });
  } catch (err) {
    console.log(err);
    return next(new Error());
  }
};
