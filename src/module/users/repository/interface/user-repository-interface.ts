import { User } from "@prisma/client";
import { UserDTO } from "../../dto/user-dto";

interface IUserRepository {
    findUserById(userId: number): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    createUser(user: UserDTO): Promise<void>;
    listAllUsers(): Promise<User[]>;
}

export { IUserRepository }