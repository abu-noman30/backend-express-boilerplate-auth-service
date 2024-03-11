import { RequestHandler } from 'express';
import userServices from './users.service';

const createUserController: RequestHandler = async (req, res) => {
	try {
		const { user } = req.body;
		const result = await userServices.createUserService(user);

		res.status(200).json({
			success: true,
			message: 'User created successfully',
			data: result
		});
	} catch (err: unknown) {
		res.status(400).json({
			success: false,
			message: (err as Error).message
		});
	}
};

export default {
	createUserController
};
