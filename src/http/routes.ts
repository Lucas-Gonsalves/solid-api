import type { FastifyInstance } from 'fastify'

import { authenticate } from './controllers/users/authenticate.controller'
import { profile } from './controllers/users/profile.controller'
import { register } from './controllers/users/register.controller'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/session', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
