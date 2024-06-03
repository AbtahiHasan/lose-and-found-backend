import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true },
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.password_history;
  return user;
};

const User = model<TUser>('User', userSchema);

export default User;
