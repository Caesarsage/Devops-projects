import { Message } from "node-nats-streaming";


import { PostHubChannels } from "../events-interface-config/posthub-channels-constants";
import { CustomPostHubListener } from "../custom-pubsub-config/base-event-listener";
import { CommentCreatedEventDef, CommentDeletedEventDef } from "../events-interface-config/comment-events-constants";
import { queueGroupComment } from "../events-interface-config/comment-events-constants";
import { Post } from "../../../models/posts";



export class CommentCreatedListener extends CustomPostHubListener<CommentCreatedEventDef> {
    readonly channel: PostHubChannels.CommentCreated = PostHubChannels.CommentCreated;
    readonly queueGroup = queueGroupComment;

    async onMessage(data: CommentCreatedEventDef["data"], msg: Message) {
        
        try {
            const { id, comment, userId, version } = data;

            const post = await Post.findById(data.post.id);

            if (!post) {
                return new Error("Post received via listener not found");
            }

            post.commentId?.push(id);

            await post.save();

            //acknowledge the message
            msg.ack();

        } catch (error) {
            throw new Error('error processing comment created event');
        }
    
    }
}


export class CommentDeletedListener extends CustomPostHubListener<CommentDeletedEventDef> {
    readonly channel: PostHubChannels.CommentDeleted = PostHubChannels.CommentDeleted;
    readonly queueGroup = queueGroupComment;

    async onMessage(data: CommentDeletedEventDef["data"], msg: Message) {
        
        try {
            const { id, comment, userId, version } = data;

            const post = await Post.findById(data.post.id);

            if (!post) {
                return new Error("post not found in CommentDeletedListener");
            }

            post.commentId?.splice(post.commentId.indexOf(id), 1);

            await post.save();

            //acknowledge the message
            msg.ack();

        } catch (error) {
            throw new Error('error processing comment deleted event');
        }
    
    }
}
