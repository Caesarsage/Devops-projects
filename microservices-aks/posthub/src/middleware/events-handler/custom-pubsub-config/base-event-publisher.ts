import { Stan } from "node-nats-streaming";
import { PostHubChannels } from "../events-interface-config/posthub-channels-constants";

interface Event {
    channel: PostHubChannels;
    data: any;
}

export abstract class CustomPostHubPublisher<T extends Event> {
    abstract channel: T['channel'];
    protected client: Stan;

    constructor(client: Stan) {
        this.client = client;
    }

    publishSync(data: T['data']): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.publish(this.channel, JSON.stringify(data), (err) => {
                if (err) {
                    return reject(err);
                }
                console.log(`Event Published to ${this.channel} channel`);
                resolve();
            });
        });
    }
}