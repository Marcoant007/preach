import { PrismaClient } from "@prisma/client"

const prismaClient = new PrismaClient({
    log: ['query', 'error', 'info', 'warn']
});

export { prismaClient } ;