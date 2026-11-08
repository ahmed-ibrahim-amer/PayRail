import 'dotenv/config.js';
import {z} from 'zod';


const envSchema = z.object({
    NODE_ENV: z.enum(['development' , 'test' , 'production']).default('development'),
    PORT:z.coerce.number().default(3000),
    DATABASE_URL:z.string().min(1,'DATABASE_URL is required'),
    DIRECT_URL:z.string().optional(),
    JWT_SECRET:z.string().min(16,'JWT_SECRET Must be at least 16 charcters'),
});

const parsed = envSchema.safeParse(process.env); //check variabels and not throw an error
if (!parsed.success) {
    console.error('Invalid environment variables:');
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
}

export const env = parsed.data;
