import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const { NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY } = process.env;
const PORT = process.env['PORT'] ?? 4000;
const AUTH_MODE = process.env['AUTH_MODE'] === 'true';

export { NODE_ENV, PORT, MONGO_CONNECTION_STRING, JWT_SECRET_KEY, AUTH_MODE };