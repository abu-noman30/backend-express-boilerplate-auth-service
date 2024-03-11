import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
	path: path.join(__dirname, '../../.env')
	// path: path.join(process.cwd(), '.env')
});

export default {
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 5000,
	db: {
		uri: process.env.DB_URI
	}
};
