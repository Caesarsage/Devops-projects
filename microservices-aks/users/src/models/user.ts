import mongoose from "mongoose";
import { PasswordHandler } from "../services/password-handler";

interface UserAttributes {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
  build(attributes: UserAttributes): UserDocument;
}

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (!this.isModified("password")) {
    return done();
  } else {
    try {
      const hashedPassword = await PasswordHandler.hash(this.password);
      this.password = hashedPassword;
      return done();
    } catch (error) {
      throw new Error("Error validating password");
    }
  }
});

userSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes);
};

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
