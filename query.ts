import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query'],
  errorFormat: 'pretty'
})

function main(queryFunc: Function) {
  queryFunc()
    .catch((e: Error) => console.error(e))
    .finally(async () => {
      await prisma.$disconnect
    })
}

module.exports = prisma