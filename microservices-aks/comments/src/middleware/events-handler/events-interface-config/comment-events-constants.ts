import { PostHubChannels } from "./posthub-channels-constants";

export interface CommentCreatedEventDef {
    channel: PostHubChannels.CommentCreated;
    data: {
        id: string;
        comment: string;
        version: number;
        userId: string;
        post: {
            id: string;
        }
    };
}

export interface CommentDeletedEventDef {
    channel: PostHubChannels.CommentDeleted
    data: {
        id: string;
        comment: string;
        version: number;
        userId: string;
        post: {
            id: string;
        }
    };
}



export const queueGroupComment = 'comments-microservice-queue-group';