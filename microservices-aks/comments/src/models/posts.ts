import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface PostAttributes {
    id: string;
    userId: string;
    post: string;
}

interface PostModel extends mongoose.Model<PostDocument> {
    build(attributes: PostAttributes): PostDocument;
    customFind(event: { id: string, version: number }): Promise<PostDocument | null>;
}

export interface PostDocument extends mongoose.Document {
    post: string;
    version: number;
}

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

postSchema.set("versionKey", "version");
postSchema.plugin(updateIfCurrentPlugin);

postSchema.statics.customFind = function (event: { id: string, version: number }) {
    return Post.findOne({ _id: event.id, 
        version: event.version - 1
    });
}



postSchema.statics.build = function (attributes: PostAttributes) {
    return new Post({
        _id: attributes.id,
        userId: attributes.userId,
        post: attributes.post,
    });
};

const Post = mongoose.model<PostDocument, PostModel>("Post", postSchema);

export { Post };