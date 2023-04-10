import mongoose from 'mongoose';
import { app } from './app';

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URI;

const appServer = async () => {
    const JWT_KEY = process.env.JWT_KEY
    if (!process.env.JWT_KEY) {
        throw new Error(`JWT_KEY ENV Secret is ${JWT_KEY} and must be created in the Kubernetes Cluster`);
    }

    if (!process.env.MONGO_URI) {
        throw new Error(`MONGO_URI ENV is ${process.env.MONGO_URI} and must be defined in the Kubernetes YAML File for this code and in the Cluster`);
    }
    
    try {
        await mongoose.connect(mongoUrl!);
        console.log('Connected to MongoDB', mongoUrl);
    } catch (err) {
        console.error(`Error Connecting to MongoDB with this error: , ${err}`);
    }

    app.listen(port, () => {
        console.log(`..........Server listening on port ${port}!!!!!`);
    });
};

appServer();