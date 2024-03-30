import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  // path: path.join(__dirname, '../../.env')
  path: path.join(process.cwd(), '.env')
});

export default {
  env: process.env.NODE_ENV || 'production',
  port: process.env.PORT,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  db: {
    uri: process.env.DB_URI
  }
};
