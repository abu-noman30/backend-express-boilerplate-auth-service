import mongoose from 'mongoose';
import app from './app';
import config from './config';

import { Server } from 'http';
import { loggerError, loggerInfo } from './services/Logger/logger';

let serverListener: Server;

async function runDB() {
	// Connect to MongoDB
	try {
		const connection = await mongoose.connect(config.db.uri as string);
		if (connection) {
			loggerInfo.info('Connected to MongoDB Successfully!!');

			serverListener = app.listen(config.port, () => {
				loggerInfo.info('Server is running on port...:', config.port);
			});
		}
	} catch (err) {
		loggerError.error('Error connecting to MongoDB');
	}

	// Handle unhandled promise rejections
	process.on('unhandledRejection', (err) => {
		if (serverListener) {
			serverListener.close();
		}
		loggerError.error('Unhandled Rejection:', err);
		process.exit(1);
	});
}
runDB();

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
	if (serverListener) {
		serverListener.close();
	}
	loggerError.error('Unhandled Rejection:', err);
	process.exit(1);
});

// Handle SIGTERM signal
process.on('SIGTERM', (err) => {
	if (serverListener) {
		serverListener.close();
	}
	loggerError.error('SIGTERM RECEIVED:', err);
	process.exit(1);
});
