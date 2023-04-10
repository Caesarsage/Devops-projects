import mongoose from "mongoose";
import {updateIfCurrentPlugin} from "mongoose-update-if-current";


interface PostAttributes {
    userId: string;
    post: string;
}

interface PostModel extends mongoose.Model<PostDocument> {
    build(attributes: PostAttributes): PostDocument;
}

export interface PostDocument extends mongoose.Document {
    userId: string;
    post: string;
    version: number;
    commentId?: Array<string>;
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
    commentId: {
        type: Array,
        default: []
    }
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

postSchema.statics.build = function (attributes: PostAttributes) {
   return new Post(attributes);
};

const Post = mongoose.model<PostDocument, PostModel>("Post", postSchema);

export { Post };