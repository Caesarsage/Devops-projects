import mongoose from "mongoose";
import { app } from "./app";
import { natsEventClass } from "./middleware/events-handler/custom-pubsub-config/nats-event-class";
import { natsCloseFxn } from "./middleware/events-handler/custom-pubsub-config/nats-exit-fxn";
import { CommentCreatedListener, CommentDeletedListener } from "./middleware/events-handler/listeners/comment-events-listener";



const port = process.env.PORT || 3000,
mongoUrl = process.env.MONGO_URI,

natsClusterId = process.env.NATS_CLUSTER_ID,
natsClientId = process.env.NATS_CLIENT_ID,
natsUrl = process.env.NATS_URL;

const postServerStart = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error(`JWT_KEY ENV Secret is ${process.env.JWT_KEY} and must be created in the Kubernetes Cluster`);
    }

    if (!process.env.MONGO_URI) {
        throw new Error(`MONGO_URI ENV is ${process.env.MONGO_URI} and must be defined in the Kubernetes YAML File for this code and in the Cluster`);
    }

    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error(`NATS_CLUSTER_ID ENV is ${process.env.NATS_CLUSTER_ID} and must be defined in the Kubernetes YAML File for this code and in the Cluster`);
    }

    if (!process.env.NATS_CLIENT_ID) {
        throw new Error(`NATS_CLIENT_ID ENV is ${process.env.NATS_CLIENT_ID} and must be defined in the Kubernetes YAML File for this code and in the Cluster`);
    }

    if (!process.env.NATS_URL) {
        throw new Error(`NATS_URL ENV is ${process.env.NATS_URL} and must be defined in the Kubernetes YAML File for this code and in the Cluster`);
    }

    console.log(natsClusterId, natsClientId, natsUrl, 'NATS Container reachable from the Post Server');
    
    try {
        await natsEventClass.connect(natsClusterId!, natsClientId!, natsUrl!);

        natsCloseFxn();

        await new CommentCreatedListener(natsEventClass.client).listen();
        await new CommentDeletedListener(natsEventClass.client).listen();


        await mongoose.connect(mongoUrl!);
        console.log('Connected to MongoDB:', mongoUrl);
    } catch (err) {
        console.error(err);
    }

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

postServerStart();