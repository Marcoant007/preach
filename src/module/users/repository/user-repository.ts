import { User } from "@prisma/client";
import { IUserRepository } from "./interface/user-repository-interface";
import { prismaClient } from "../../../shared/database/migrations/prisma-client";
import { IUserDTO } from "../dto/user-dto";
import { AppError } from "../../../shared/error/app-error";
import { logger } from "../../../shared/pino/pino-logger";

class UserRepository implements IUserRepository {
    async findUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    email: email
                }
            });
            return user;
        } catch (error) {
            logger.error(error)
            throw new AppError(`An error occurred while fetching user by email ${error}`, 500);
        }
    }

    async createUser(userDTO: IUserDTO): Promise<void> {
        try {
            await prismaClient.user.create({
                data: {
                    username: userDTO.username,
                    email: userDTO.email,
                    password: userDTO.password,
                    birthDate: userDTO.birthDate,
                }
            });
        } catch (error) {
            logger.error(error)
            throw new AppError(`An error occurred while create user`, 500);
        }
    }

    async findUserById(userId: number): Promise<User | null> {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    id: userId
                }
            });

            return user;
        } catch (error) {
            logger.error(error)
            throw new AppError(`An error occurred while fetching user by id ${error}`, 500);
        }
    }
}

export { UserRepository }