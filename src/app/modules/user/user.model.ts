import { Schema, model } from 'mongoose';
import { T_User } from './user.interface';

// Schema for User
const userSchema = new Schema<T_User>(
	{
		user_id: { type: String, required: true },
		user_role: { type: String, required: true },
		user_password: { type: String }
	},
	{ timestamps: true }
);

// Model for User
export const User = model<T_User>('User', userSchema);
