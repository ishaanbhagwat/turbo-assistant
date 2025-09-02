import express from 'express';
import passport from 'passport';
import session from 'express-session';
import env from './config/env';
import { PrismaClient } from '@prisma/client';

// Initialize Express app
const app = express();

// Initialize Prisma client
export const prisma = new PrismaClient();

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: true}
  })
);

// Root endpoint
app.get('/', (req, res) => {
  console.log(`${req.path}`);
  res.status(200).json({
    message: 'Turbo Backend API',
    version: '1.0.0',
  });
});

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(`${req.path} not found`);
  res.status(404).send('Not Found');
});

app.use((err: express.Errback, req: express.Request, res:express.Response , next: express.NextFunction) => {
  console.log(err);
  console.log(`Error originating from: ${req.path}`);
  res.status(500).send('Internal Server Error')
});

export default app;
