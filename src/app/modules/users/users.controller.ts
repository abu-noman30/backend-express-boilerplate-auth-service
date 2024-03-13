import { RequestHandler } from 'express';
import { z } from 'zod';
import { UserServices } from './users.service';

const createUserController: RequestHandler = async (req, res, next) => {
	try {
		// Zod validation
		/* const zodSchema = z.object({
			body: z.object({
				role: z.string({
					required_error: 'Role is required'
				}),
				password: z.string({
					required_error: 'Password is required'
				})
			})
		});
		await zodSchema.parseAsync(req); */

		const { user } = req.body;
		const result = await UserServices.createUserService(user);

		res.status(200).json({
			success: true,
			message: 'User created successfully',
			data: result
		});
	} catch (err) {
		next(err);
	}
};

export const UserControllers = {
	createUserController
};
