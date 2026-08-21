import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

// 1. Configura a conexão do banco de dados nativo
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

// 2. Instancia o adaptador do Prisma
const adapter = new PrismaPg(pool)

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// 3. Passa o adaptador configurado para o cliente
export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
