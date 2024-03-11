import path from 'path';
import winston, { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Rotate File Transport
const createRotateFileTransport = (folderName: string, filename: string) => {
	return new DailyRotateFile({
		filename: path.join(process.cwd(), 'logs', 'winston', folderName, filename),
		datePattern: 'YYYY-MM-DD-HH',
		zippedArchive: true,
		maxSize: '20m',
		maxFiles: '1d'
	});
};

// Winston Logger
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} - [${level}]: ${message}`;
});

const createLogger = (level: string, folderName: string, filename: string) => {
	return winston.createLogger({
		level: level,
		format: combine(timestamp({ format: 'DD/MM/YYYY - HH:mm:ss' }), myFormat),
		transports: [
			new winston.transports.Console({
				format: combine(colorize(), myFormat)
			}),
			createRotateFileTransport(folderName, filename)
		]
	});
};

export const loggerInfo = createLogger('info', 'success-logs', '%DATE%-success.log');
export const loggerError = createLogger('error', 'error-logs', '%DATE%-error.log');
export const loggerDebug = createLogger('debug', 'debug-logs', '%DATE%-debug.log');
