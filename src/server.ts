import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
const port = config.port;
process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

let server: Server;
const bootstrap = async () => {
  try {
    // await mongoose.connect(config.database_url as string);
    console.log('✅ Database connected successfully');
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log('failed to connect to server', error);
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};
bootstrap();
process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});