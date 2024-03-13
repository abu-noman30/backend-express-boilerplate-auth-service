import cors from 'cors';

import express, { Application, Request, Response } from 'express';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler/globalErrorHandler';
import { UserRoute } from './app/modules/users/users.route';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/users', UserRoute);

// Test route
app.get('/', (req: Request, res: Response) => {
	res.send('Server is running...');
});

// Global error handler
app.use(globalErrorHandler);

export default app;
