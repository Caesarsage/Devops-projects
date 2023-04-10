import { Message } from "node-nats-streaming";

import { PostHubChannels } from "../events-interface-config/posthub-channels-constants";
import { CustomPostHubListener } from "../custom-pubsub-config/base-event-listener";
import {
  PostCreatedEventDef,
  PostUpdatedEventDef,
  queueGroupPostHub,
} from "../events-interface-config/post-events-constants";

import { Post } from "../../../models/posts";

export class PostCreatedListener extends CustomPostHubListener<PostCreatedEventDef> {
  readonly channel: PostHubChannels.PostCreated = PostHubChannels.PostCreated;
  readonly queueGroup = queueGroupPostHub;

  async onMessage(data: PostCreatedEventDef["data"], msg: Message) {
    try {
      const { id, version, post, userId } = data;

      const newPost = await Post.build({
        id,
        userId,
        post,
        comment: [],
      });

      await newPost.save();

      //acknowledge the message
      msg.ack();
    } catch (error) {
      throw new Error("error processing post created listen event");
    }
  }
}

export class PostUpdatedListener extends CustomPostHubListener<PostUpdatedEventDef> {
  readonly channel: PostHubChannels.PostUpdated = PostHubChannels.PostUpdated;
  readonly queueGroup = queueGroupPostHub

  async onMessage(data: PostUpdatedEventDef["data"], msg: Message) {
          try {
            const { id, version, post, userId } = data;

            const existingPost = await Post.customFind(data);

            if (!existingPost) {
              return new Error(`Post with id ${id} does not exist`);
            }

            if (existingPost.post !== post) {
              existingPost.set({ post });
              await existingPost.save();
              msg.ack();
            } else {
              return msg.ack();
            }

            //acknowledge the message
            msg.ack();
          } catch (error) {
            throw new Error("error processing comment deleted event");
          }
  }
}
