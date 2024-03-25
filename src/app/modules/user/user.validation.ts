import { z } from 'zod';

const createUserZodSchema = z.object({
	body: z.object({
		user_id: z.string().optional(),
		user_role: z.string({
			required_error: 'Role is required'
		}),
		user_password: z.string().optional()
	})
});

const updateUserZodSchema = z.object({
	body: z
		.object({
			user_id: z.string().optional(),
			user_role: z
				.string({
					required_error: 'Role is required'
				})
				.optional(),
			user_password: z.string().optional()
		})
		.refine((data) => {
			if (data.user_id) {
				throw new Error('User id is not allowed to be updated');
			}

			return true;
		})
});

export const UserZodSchema = {
	createUserZodSchema,
	updateUserZodSchema
};
