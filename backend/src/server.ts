import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import { connectDatabase, disconnectDatabase } from './config/database';
import { env } from './config/env';
import { typeDefs } from './graphql/schemas';
import { resolvers } from './graphql/resolvers';
import { createContext } from './graphql/context/context';
import { errorHandler } from './middlewares/errorHandlermiddleware';

async function startServer() {
  // Create Express app
  const app = express();
  const httpServer = http.createServer(app);

  // Connect to database
  await connectDatabase();

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    formatError: (err) => {
      console.error('GraphQL Error:', err);
      return {
        message: err.message,
        code: err.extensions?.code || 'INTERNAL_ERROR',
        path: err.path,
      };
    },
  });

  // Start Apollo Server
  await server.start();

  // Middleware
  app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
    });
  });

  // GraphQL endpoint
  app.use(
    '/graphql',
    express.json({ limit: '50mb' }),
    expressMiddleware(server, {
      context: createContext,
      
    })
  );

  // Error handling middleware
  app.use(errorHandler);

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

  // Start server
  const PORT = env.PORT;
  await new Promise<void>((resolve) => {
    httpServer.listen(PORT, resolve);
  });

  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);

  // Graceful shutdown
  const gracefulShutdown = async (signal: string) => {
    console.log(`\n${signal} received. Starting graceful shutdown...`);
    
    await server.stop();
    httpServer.close(() => {
      console.log('HTTP server closed');
    });
    
    await disconnectDatabase();
    console.log('Database disconnected');
    
    process.exit(0);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}

// Start the server
startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});