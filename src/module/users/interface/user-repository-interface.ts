import { User } from "@prisma/client";
import { IUserDTO } from "../dto/user-dto";

interface IUserRepository {
    findUserById(userId: number):Promise<User>;
    findUserByEmail(email: string):Promise<User>;
    createUser(user: IUserDTO): Promise<void>
}

export {IUserRepository}