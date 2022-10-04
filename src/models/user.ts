import mongoose from "mongoose";
import Password from "../services/password";

// An interface that describes our properties
// that are required to create a new User
interface UserAttrs {
  email: string;
  password?: string;
  username?: string;
  displayName?: string;
  picture?: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An inbterface that describes the properties
// that a User Document has
export interface UserDoc extends mongoose.Document {
  id: string;
  email: string;
  password?: string;
  username?: string;
  displayName?: string;
  picture?: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    displayName: {
      type: String,
      required: false,
    },
    picture: {
      type: String,
      required: false,
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
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }

  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("users", userSchema);

export { User };
