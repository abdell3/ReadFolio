import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import userRepository from '../Repositories/UserRepository';
import { IUser } from '../Models/User';

export interface LoginResult {
  token: string;
  userId: string;
  role: string;
}

export class AuthService {
  async login(username: string, password: string): Promise<LoginResult> {
    const user = await userRepository.findByUsername(username);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const userId = (user._id as any).toString();
    const secret = config.jwtSecret as string;
    const expiresIn = config.jwtExpiresIn as string;
    const token = (jwt.sign as any)(
      { userId, role: user.role },
      secret,
      { expiresIn }
    );

    return {
      token,
      userId,
      role: user.role,
    };
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}

export default new AuthService();

