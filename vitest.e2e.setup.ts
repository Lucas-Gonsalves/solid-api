import { config } from 'dotenv'
import { afterAll, beforeEach } from 'vitest'

config({
  path: '.env.test',
  override: true,
  quiet: true,
})

const { prisma } = await import('@/lib/prisma')

beforeEach(async () => {
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "check_ins", "gyms", "users" RESTART IDENTITY CASCADE;',
  )
})

afterAll(async () => {
  await prisma.$disconnect()
})
