import fastify from 'fastify'

import { prisma } from './lib/prisma'

export const app = fastify()

prisma.user.create({
  data: {
    name: 'Lucas Gonçalves',
    email: 'lucasluz1710@gmail.com',
  },
})
