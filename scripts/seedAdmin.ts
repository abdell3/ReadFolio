import 'dotenv/config';
import { connectDatabase, disconnectDatabase } from '../app/config/database';
import authService from '../app/Services/AuthService';
import userRepository from '../app/Repositories/UserRepository';
import { config } from '../app/config/env';

async function seedAdmin() {
  try {
    await connectDatabase();

    const existingAdmin = await userRepository.findByUsername(config.adminUsername);
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      await disconnectDatabase();
      process.exit(0);
    }

    const passwordHash = await authService.hashPassword(config.adminPassword);
    const admin = await userRepository.create({
      username: config.adminUsername,
      passwordHash,
      role: 'ADMIN',
    });

    console.log('Admin user created successfully');
    console.log(`Username: ${config.adminUsername}`);
    console.log(`Password: ${config.adminPassword}`);
    
    await disconnectDatabase();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    await disconnectDatabase();
    process.exit(1);
  }
}

seedAdmin();

