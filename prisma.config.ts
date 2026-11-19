/// <reference types="node" />
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

const isTest = process.env.NODE_ENV === 'test';

const databaseUrl = isTest
  ? env('DATABASE_URL_TEST')
  : env('DIRECT_URL');

console.log('Selected database host:', new URL(databaseUrl).host);

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: databaseUrl,
  },
});