import { User } from "@prisma/client";
import { IUserDTO } from "../../dto/user-dto";

interface IUserRepository {
    findUserById(userId: number):Promise<User | null>;
    findUserByEmail(email: string):Promise<User | null>;
    findUserByUsername(username: string):Promise<User | null>;
    createUser(user: IUserDTO): Promise<void>
}

export {IUserRepository}