import type { Gym } from 'generated/prisma/client'

import type { GymsRepository } from '@/repositories/gyms-repository'

interface SeachGymsUseCaseRequest {
  query: string
  page: number
}

interface SeachGymsUseCaseResponse {
  gyms: Gym[]
}

export class SeachGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SeachGymsUseCaseRequest): Promise<SeachGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)
    return { gyms }
  }
}
