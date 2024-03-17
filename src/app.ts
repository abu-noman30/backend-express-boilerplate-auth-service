import cors from 'cors';
import Routes from './app/routes';

import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler/globalErrorHandler';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1', Routes);

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running...');
});

// Global error handler
app.use(globalErrorHandler);

// Not-Found handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found'
      }
    ]
  });

  next();
});

export default app;
