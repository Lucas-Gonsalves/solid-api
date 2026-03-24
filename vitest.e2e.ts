import { execSync } from 'node:child_process'
import { resolve } from 'node:path'

import { config } from 'dotenv'

function loadTestEnv() {
  config({
    path: resolve(process.cwd(), '.env.test'),
    override: true,
    quiet: true,
  })
}

function isWorkerContext() {
  return Boolean(process.env.VITEST_WORKER_ID)
}

function runCommand(command: string) {
  execSync(command, {
    cwd: process.cwd(),
    stdio: 'inherit',
    env: process.env,
  })
}

loadTestEnv()

if (isWorkerContext()) {
  const { afterAll, beforeEach } = await import('vitest')
  const { prisma } = await import('@/lib/prisma')

  beforeEach(async () => {
    await prisma.$executeRawUnsafe(
      'TRUNCATE TABLE "check_ins", "gyms", "users" RESTART IDENTITY CASCADE;',
    )
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })
}

export async function setup() {
  try {
    console.log('[e2e] Resetting test database...')
    runCommand('npx prisma migrate reset --force')
  } catch {
    throw new Error(
      'Could not reset the test database. Start it with "docker compose -f dokcer-compose.test.yml up -d" and try again.',
    )
  }
}
