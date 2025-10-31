import 'dotenv/config';
import { connectDatabase, disconnectDatabase } from '../app/config/database';
import authService from '../app/services/AuthService';
import userRepository from '../app/repositories/UserRepository';
import { config } from '../app/config/env';

async function seedAdmin() {
  try {
    await connectDatabase();

    // Vérifier si un admin existe déjà
    const existingAdmin = await userRepository.findByUsername(config.adminUsername);
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      await disconnectDatabase();
      process.exit(0);
    }

    // Créer l'admin
    const passwordHash = await authService.hashPassword(config.adminPassword);
    const admin = await userRepository.create({
      username: config.adminUsername,
      passwordHash,
      role: 'ADMIN',
    });

    console.log('✅ Admin user created successfully');
    console.log(`Username: ${config.adminUsername}`);
    console.log(`Password: ${config.adminPassword}`);
    
    await disconnectDatabase();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    await disconnectDatabase();
    process.exit(1);
  }
}

seedAdmin();

