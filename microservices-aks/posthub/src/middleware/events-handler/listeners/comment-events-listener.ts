import { Message } from "node-nats-streaming";


import { PostHubChannels } from "../events-interface-config/posthub-channels-constants";
import { CustomPostHubListener } from "../custom-pubsub-config/base-event-listener";
import { CommentCreatedEventDef, CommentDeletedEventDef } from "../events-interface-config/comment-events-constants";
import { queueGroupPostHub } from "../events-interface-config/post-events-constants";
import { Post } from "../../../models/posts";
import { Comment } from "../../../models/comments";



export class CommentCreatedListener extends CustomPostHubListener<CommentCreatedEventDef> {
    readonly channel: PostHubChannels.CommentCreated = PostHubChannels.CommentCreated;
    readonly queueGroup = queueGroupPostHub;

    async onMessage(data: CommentCreatedEventDef["data"], msg: Message) {
        
        try {

            const newComment = await Comment.build({
                id: data.id,
                comment: data.comment,
                userId: data.userId,
                postId: data.post.id
            });

            await newComment.save();

            const updatePost = await Post.findById(data.post.id);

            if (!updatePost) {
                return new Error(`Post with id ${data.post.id} does not exist`);
            }

            updatePost.comment?.push({
                id: newComment.id,
                comment: newComment.comment,
                userId: newComment.userId,
                post: newComment.postId
            });

            await updatePost.save();

            msg.ack();


        } catch (error) {
            throw new Error('error processing comment created event');
        }
    
    }
}


export class CommentDeletedListener extends CustomPostHubListener<CommentDeletedEventDef> {
    readonly channel: PostHubChannels.CommentDeleted = PostHubChannels.CommentDeleted;
    readonly queueGroup = queueGroupPostHub;

    async onMessage(data: CommentDeletedEventDef["data"], msg: Message) {
        
        try {
            
            const existingPost = await Post.findById(data.post.id);


            if (!existingPost) {
                return new Error("post not found in CommentDeletedListener");
            }

            const commentIndex = await existingPost.comment?.findIndex(comment => comment.id === data.id);

            if (commentIndex === -1) {
                return new Error("comment not found in CommentDeletedListener");
            }

            existingPost.comment?.splice(commentIndex!, 1);

            await existingPost.save();

            //acknowledge the message
            msg.ack();

        } catch (error) {
            throw new Error('error processing comment deleted event');
        }
    
    }
}