import { User } from "@prisma/client";
import { IUserRepository } from "./interface/user-repository-interface";
import { prismaClient } from "../../../shared/database/migrations/prisma-client";
import { UserDTO } from "../dto/user-dto";
import { AppError } from "../../../shared/error/app-error";
import { logger } from "../../../shared/pino/pino-logger";

class UserRepository implements IUserRepository {
    async listAllUsers(): Promise<User[]> {
        const users = await prismaClient.user.findMany();
        return users;
    };

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        });

        return user;
    };

    async createUser(userDTO: UserDTO): Promise<User> {
        return await prismaClient.user.create({
            data: {
                username: userDTO.username,
                email: userDTO.email,
                password: userDTO.password,
                birthDate: userDTO.birthDate,
            }
        });
    };

    async findUserById(userId: number): Promise<User | null> {
        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        });

        return user;
    };
}

export { UserRepository }