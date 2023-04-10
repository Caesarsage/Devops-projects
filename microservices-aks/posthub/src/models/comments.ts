import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface CommentAttributes {
    id: string;
    userId: string;
    comment: string;
    postId: string;
}

interface CommentModel extends mongoose.Model<CommentDocument> {
    build(attributes: CommentAttributes): CommentDocument;
    customFind(event: { id: string, version: number }): Promise<CommentDocument | null>;
}

export interface CommentDocument extends mongoose.Document {
    userId: string;
    comment: string;
    postId: string;
    version: number;
}

const commentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

commentSchema.set("versionKey", "version");
commentSchema.plugin(updateIfCurrentPlugin);


commentSchema.statics.customFind = function (event: { id: string, version: number }) {
    return Comment.findOne({ _id: event.id, 
        version: event.version - 1
    });
}


commentSchema.statics.build = function (attributes: CommentAttributes) {
    return new Comment({
        _id: attributes.id,
        userId: attributes.userId,
        comment: attributes.comment,
        postId: attributes.postId
    });
};

commentSchema.statics.delete = function (id: string) {
    return Comment.findByIdAndRemove(id);
}

const Comment = mongoose.model<CommentDocument, CommentModel>('Comment', commentSchema);

export { Comment };

