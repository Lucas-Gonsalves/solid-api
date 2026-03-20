import type { CheckIn, Prisma } from 'generated/prisma/client'

export interface CheckInsRepository {
  save(checkIn: CheckIn): Promise<CheckIn>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  countByUserId(userId: string): Promise<number>
  findById(id: string): Promise<CheckIn | null>
}
