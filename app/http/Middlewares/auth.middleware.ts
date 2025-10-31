import jwt from 'jsonwebtoken';
import { config } from '../../config/env';

export interface AuthContext {
  user?: {
    userId: string;
    role: string;
  };
}

export const authMiddleware = async (req: any): Promise<AuthContext> => {
  const context: AuthContext = {};

  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return context;
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string; role: string };
    context.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
  } catch (error) {
    console.error('Invalid token:', error);
  }

  return context;
};

export const requireAdmin = (context: AuthContext): void => {
  if (!context.user || context.user.role !== 'ADMIN') {
    throw new Error('Unauthorized: Admin access required');
  }
};

