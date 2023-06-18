import { User } from "@prisma/client";
import { LoginDTO } from "../../dto/login-dto";
import { UserDTO } from "../../dto/user-dto";

interface IUserRepository {
    findUserById(userId: number): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    createUser(user: UserDTO): Promise<User>;
    listAllUsers(): Promise<User[]>;
    updateUsers(userId: number, userDTO: UserDTO): Promise<User>; 
    findUserByEmailOrLogin(user: LoginDTO):Promise<User | null>
}

export { IUserRepository }