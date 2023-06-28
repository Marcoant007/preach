import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../shared/error/app-error";
import { LoginDTO } from "../user/dto/login-dto";
import { UserDTO } from "../user/dto/user-dto";
import { IUserRepository } from "../user/repository/user-repository-interface";

@injectable()
class LoginUseCase {
    constructor(@inject("UserRepository") private usersRepository: IUserRepository) { }
    
    async execute(user: LoginDTO) : Promise<UserDTO>{
        const userDb = await this.usersRepository.findUserByEmailOrLogin(user);
        if(!userDb){
            throw new AppError("Invalid credentials");
        }
        await this.verifyPassword(user.password, userDb.password);
        return UserDTO.fromUser(userDb);
    }

    private async verifyPassword(expectedPassword: string, password: string): Promise<boolean>{
        const passwordMatched: boolean = await compare(expectedPassword, password);

        if(!passwordMatched){
            throw new AppError("Invalid credentials");
        }

        return passwordMatched;
    }
}

export {LoginUseCase}