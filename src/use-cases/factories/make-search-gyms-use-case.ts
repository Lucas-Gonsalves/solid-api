import { PrismaGymsRespository } from '@/repositories/prisma/prisma-gyms-repository'

import { SeachGymsUseCase } from '../search-gyms'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRespository()
  const useCase = new SeachGymsUseCase(gymsRepository)

  return useCase
}
