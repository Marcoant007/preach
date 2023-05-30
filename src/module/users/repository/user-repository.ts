import { User } from "@prisma/client";
import { IUserRepository } from "../interface/user-repository-interface";
import { prismaClient } from "../../../shared/database/migrations/prisma-client";
import { IUserDTO } from "../dto/user-dto";

class UserRepository implements IUserRepository {
    async findUserByEmail(email: string): Promise<User> {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    email: email
                }
            });
            if (!user) {
                throw new Error("Users does not exist");
            }
            return user;
        } catch (error) {
            throw new Error("Error " + error);
        }
    }
    
    async createUser(userDTO: IUserDTO): Promise<void> {
        try {
            const user = await prismaClient.user.create({
                data: {
                    name: userDTO.name,
                    email: userDTO.email,
                    password: userDTO.password,
                    username: userDTO.username,
                    birthDate: userDTO.birthDate,
                }
            });
        } catch (error) {
            throw new Error("Error to create user");
        }
    }

    async findUserById(userId: number): Promise<User> {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    id: userId
                }
            });
            if (!user) {
                throw new Error("Users does not exist");
            }
            return user;
        } catch (error) {
            throw new Error("Error " + error);
        }
    }
}

export { UserRepository }