import express from 'express';
import { UserRoute } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
	{
		path: '/user',
		route: UserRoute
	}
];

moduleRoutes.forEach((moduleRoute) => {
	router.use(moduleRoute?.path, moduleRoute?.route);
});

export default router;
