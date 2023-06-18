import { User } from "@prisma/client";
import { IUserRepository } from "./interface/user-repository-interface";
import { prismaClient } from "../../../shared/database/migrations/prisma-client";
import { UserDTO } from "../dto/user-dto";
import { AppError } from "../../../shared/error/app-error";
import { logger } from "../../../shared/pino/pino-logger";
import { LoginDTO } from "../dto/login-dto";

class UserRepository implements IUserRepository {
    async findUserByEmailOrLogin(userDTO: LoginDTO): Promise<User | null> {
        const user = await prismaClient.user.findFirst({
            where: {
                OR: [
                    { email: userDTO.email },
                    { username: userDTO.username }
                ],
            },
        })

        return user ;
    }

    async updateUsers(userId: number, userDTO: UserDTO): Promise<User> {
        const user = await prismaClient.user.update({
            where: { id: userId },
            data: {
              username: userDTO.username,
              email: userDTO.email,
              password: userDTO.password,
              cellPhone: userDTO.cellPhone,
              birthDate: userDTO.birthDate,
            },
          });
          return user;
    }
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