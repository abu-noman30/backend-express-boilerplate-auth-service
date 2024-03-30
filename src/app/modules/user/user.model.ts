import bcrypt from 'bcrypt';
import config from '../../../config';

import { Schema, model } from 'mongoose';
import { UserModel } from './user.interface';
import { T_User, T_UserMethods } from './user.interface.d';

// Schema for User
const UserSchema = new Schema<T_User, UserModel, T_UserMethods>(
  {
    user_id: { type: String, required: true },
    user_role: { type: String, required: true },
    user_password: { type: String }
  },
  {
    // add createdAt and updatedAt fields
    timestamps: true,

    // convert _id to id -> all database include mongodb have id field instead of _id
    toJSON: {
      virtuals: true
    }
  }
);

// bcrypt password before save to db
UserSchema.pre('save', async function (next) {
  // hashing user password
  const thisUser = this;
  thisUser.user_password = await bcrypt.hash(thisUser.user_password, Number(config.bcrypt_salt_rounds));

  /* if (!user.needsPasswordChange) {
    user.passwordChangedAt = new Date();
  } */

  next();
});

// Model for User
export const User = model<T_User, UserModel>('User', UserSchema);
