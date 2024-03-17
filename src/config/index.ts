import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
  // path: path.join(process.cwd(), '.env')
});

export default {
  env: process.env.NODE_ENV || 'production',
  port: process.env.PORT || '5001' || '5002' || '5003' || '5004' || '5005',
  db: {
    uri: process.env.DB_URI
  }
};
