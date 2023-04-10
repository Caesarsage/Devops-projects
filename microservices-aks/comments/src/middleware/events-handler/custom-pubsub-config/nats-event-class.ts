// A helper function to connect to NATS Container anywhere in the code
import nats, { Stan } from "node-nats-streaming";

class NatsEventClass {
  private _client?: Stan;

    get client() {
        if (!this._client) {
            throw new Error('Could not access NATS Container');
        }
        return this._client;
    }

    connect(clusterId: string, clientId: string, url: string) {
        this._client = nats.connect(clusterId, clientId, { url });

        return new Promise<void>((resolve, reject) => {
            this.client.on('connect', () => {
                console.log('Connected to NATS on url: ', url);
                resolve();
            });
            this.client.on('error', (err) => {
                console.log('Error connecting to NATS on url: ',url, 'ErrorNoted: ', err);
                reject(err);
            }
            );
        }
        );
    }
}

export const natsEventClass = new NatsEventClass();