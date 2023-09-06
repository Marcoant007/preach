import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs';

const prisma = new PrismaClient()

async function createSeedAdmin() {
    let password = "admin@1";
    const passwordHash = await hash(password, 8);
    const newUser = await prisma.user.create({
        data: {
            username: "admin",
            email: "admin@gmail.com",
            password: passwordHash,
            birthDate: "27/02/1998",
            blocked: false,
            active: true,
            emailChecked: true,
            urlImg: "",
            cellPhone: "27988740756"
        },
    })
    console.log(`Created new user: ${newUser.username} (ID: ${newUser.id})`)
}

createSeedAdmin()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

