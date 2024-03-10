import { Schema, model } from 'mongoose';
import { T_User } from './users.interface';

// Schema for User
const userSchema = new Schema<T_User>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

// Model for User
export const User = model<T_User>('User', userSchema);
