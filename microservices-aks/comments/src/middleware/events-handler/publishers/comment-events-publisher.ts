import { PostHubChannels} from "../events-interface-config/posthub-channels-constants";
import { CommentCreatedEventDef, CommentDeletedEventDef } from "../events-interface-config/comment-events-constants";
import { CustomPostHubPublisher } from "../custom-pubsub-config/base-event-publisher";


export class CommentCreatedPublisher extends CustomPostHubPublisher<CommentCreatedEventDef> {
    readonly channel: PostHubChannels.CommentCreated = PostHubChannels.CommentCreated;
}


export class CommentDeletedPublisher extends CustomPostHubPublisher<CommentDeletedEventDef> {
    readonly channel: PostHubChannels.CommentDeleted = PostHubChannels.CommentDeleted;
}