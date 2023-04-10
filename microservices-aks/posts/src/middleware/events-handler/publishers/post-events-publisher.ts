import { PostHubChannels} from "../events-interface-config/posthub-channels-constants";
import {  PostCreatedEventDef, PostUpdatedEventDef } from "../events-interface-config/post-events-constants";
import { CustomPostHubPublisher } from "../custom-pubsub-config/base-event-publisher";


export class PostCreatedPublisher extends CustomPostHubPublisher<PostCreatedEventDef> {
    readonly channel: PostHubChannels.PostCreated = PostHubChannels.PostCreated;
}


export class PostUpdatedPublisher extends CustomPostHubPublisher<PostUpdatedEventDef> {
    readonly channel: PostHubChannels.PostUpdated = PostHubChannels.PostUpdated;
}