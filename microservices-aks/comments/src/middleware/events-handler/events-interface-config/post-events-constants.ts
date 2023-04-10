import { PostHubChannels } from "./posthub-channels-constants";

export interface PostCreatedEventDef {
    channel: PostHubChannels.PostCreated;
    data: {
        id: string;
        version: number;
        post: string;
        userId: string;
    };
}

export interface PostUpdatedEventDef {
    channel: PostHubChannels.PostUpdated
    data: {
        id: string;
        version: number;
        post: string;
        userId: string;
    };
}

export const queueGroupPost = 'posts-microservice-queue-group';