import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './app/graphql';
import { connectDatabase } from './app/config/database';
import { config } from './app/config/env';
import { authMiddleware } from './app/http/Middlewares/auth.middleware';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

async function startServer() {
  await connectDatabase();

  const app = express();

  app.use(helmet());
  app.use(cors());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });
  app.use('/graphql', limiter);

  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return await authMiddleware(req);
    },
    introspection: config.env === 'development',
  });

  await server.start();
  server.applyMiddleware({ app: app as any, path: '/graphql' });

  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}/graphql`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

