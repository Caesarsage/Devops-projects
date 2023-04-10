import { Message, Stan } from "node-nats-streaming";
import { PostHubChannels } from "../events-interface-config/posthub-channels-constants";

interface Event {
    channel: PostHubChannels;
    data: any;
}

export abstract class CustomPostHubListener<T extends Event> {
    abstract channel: T['channel'];
    abstract queueGroup: string;
    abstract onMessage(data: T['data'], msg: Message): void;
    protected client: Stan;
    protected ackWait = 5 * 1000; // 5 seconds

    constructor(client: Stan) {
        this.client = client;
    }
    
    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroup);
    }

    listen() {
        const subscription = this.client.subscribe(
            this.channel, 
            this.queueGroup, 
            this.subscriptionOptions()
        );
        
        subscription.on('message', (msg: Message) => {
            console.log(`Received a message in ${this.queueGroup} queue from channel ${this.channel}: Sequence: ${msg.getSequence()}, :  ${msg.getData()}`);

            const data = this.parseMessage(msg);
            this.onMessage(data, msg);

        });
    }

    parseMessage(msg: Message) {
        const data = msg.getData();
        return typeof data === 'string'
            ? JSON.parse(data)
            : data;
    }
}