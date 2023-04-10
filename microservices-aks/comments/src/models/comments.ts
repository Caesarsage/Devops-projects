import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

import { PostDocument } from './posts';

interface CommentAttributes {
    userId: string;
    comment: string;
    post: PostDocument;
}

interface CommentModel extends mongoose.Model<CommentDocument> {
    build(attributes: CommentAttributes): CommentDocument;
    delete(id: string): Promise<CommentDocument>;
}

interface CommentDocument extends mongoose.Document {
    userId: string;
    comment: string;
    post: PostDocument;
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
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
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


commentSchema.statics.build = function (attributes: CommentAttributes) {
    return new Comment(attributes);
};

commentSchema.statics.delete = function (id: string) {
    return Comment.findByIdAndRemove(id);
}

const Comment = mongoose.model<CommentDocument, CommentModel>('Comment', commentSchema);

export { Comment };

