import app from './app';
import { prisma } from './app';

const server = app.listen(3500);

export default server;