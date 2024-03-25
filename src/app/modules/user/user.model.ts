import { Schema, model } from 'mongoose';
import { T_User } from './user.interface';

// Schema for User
const userSchema = new Schema<T_User>(
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

// Model for User
export const User = model<T_User>('User', userSchema);
