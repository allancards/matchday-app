import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

// Configura o pool de conexões com a URL do banco
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Cria o adapter para o Prisma
const adapter = new PrismaPg(pool)

// Instancia o PrismaClient com o adapter
const prisma = new PrismaClient({ adapter })

export default prisma