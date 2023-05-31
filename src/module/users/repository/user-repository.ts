import { User } from "@prisma/client";
import { IUserRepository } from "./interface/user-repository-interface";
import { prismaClient } from "../../../shared/database/migrations/prisma-client";
import { IUserDTO } from "../dto/user-dto";
import { AppError } from "../../../shared/error/AppError";

class UserRepository implements IUserRepository {

    async findUserByUsername(username: string): Promise<User | null> {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    username: username
                }
            });
            return user;
        } catch (error) {
            console.log(error);
            throw new AppError(`An error occurred while fetching user by username`, 500);
        }
    }

    async findUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    email: email
                }
            });
            return user;
        } catch (error) {
            throw new AppError(`An error occurred while fetching user by email ${error}`, 500);
        }
    }

    async createUser(userDTO: IUserDTO): Promise<void> {
        try {
            await prismaClient.user.create({
                data: {
                    name: userDTO.name,
                    email: userDTO.email,
                    password: userDTO.password,
                    username: userDTO.username,
                    birthDate: userDTO.birthDate,
                }
            });
        } catch (error) {
            console.log(error)
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
            console.log(error)
            throw new AppError(`An error occurred while fetching user by id ${error}`, 500);
        }
    }
}

export { UserRepository }