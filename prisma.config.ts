import "dotenv/config";
import { z } from 'zod'
import { defineConfig } from "prisma/config";

const prismaEnvSchema = z.object({
  DATABASE_URL: z.string(),
})

const prismaEnv = prismaEnvSchema.safeParse(process.env)

if (prismaEnv.success === false) {
  console.error('❌ Invalid Prisma environment variables', prismaEnv.error.format())
  throw new Error('Invalid Prisma environment variables')
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: prismaEnv.data.DATABASE_URL,
  },
});
