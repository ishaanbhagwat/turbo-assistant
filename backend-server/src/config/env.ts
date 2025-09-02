import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const envSchema = z.object({
    PORT: z.string().transform(Number).refine(val => !isNaN(val), {message: "PORT should be a number"}),
    SESSION_SECRET: z.string(),
    GOOGLE_AUTH_CLIENT_ID: z.string(),
    GOOGLE_AUTH_CLIENT_SECRET: z.string(),
    GOOGLE_CALLBACK_URL: z.string(),
    FRONTEND_URL: z.string(),
    DATABASE_PROJECT_ID: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_URL: z.string(),
    DIRECT_URL: z.string(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const env = envSchema.parse(process.env);

export default env;
