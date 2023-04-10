import { natsEventClass } from "./nats-event-class";

export function natsCloseFxn() {
    natsEventClass.client.on('close', () => {
        console.log('Lost connection to NATS Container');
        process.exit();
    });

    process.on('SIGINT', () => natsEventClass.client.close());
    process.on('SIGTERM', () => natsEventClass.client.close());
    process.on('SIGUSR2', () => natsEventClass.client.close());
    process.on('uncaughtException', () => natsEventClass.client.close());
    process.on('unhandledRejection', () => natsEventClass.client.close());
    process.on('warning', () => natsEventClass.client.close());
    process.on('exit', () => natsEventClass.client.close());
}