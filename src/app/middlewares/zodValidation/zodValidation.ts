import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const zodValidation = (zodSchema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		await zodSchema.parseAsync({
			body: req.body,
			query: req.query,
			params: req.params,
			cookies: req.cookies
		});
		next();
	} catch (error) {
		next(error);
	}
};
