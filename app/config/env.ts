import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  env: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/codefolio',
  jwtSecret: (process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production') as string,
  jwtExpiresIn: (process.env.JWT_EXPIRES_IN || '8h') as string,
  adminUsername: process.env.ADMIN_USERNAME || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
};

export default config;

