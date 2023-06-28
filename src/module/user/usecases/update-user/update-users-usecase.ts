import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/error/app-error";
import { UserDTO } from "../../dto/user-dto";
import { IUserRepository } from "../../repository/user-repository-interface";

interface IRequest {
    userId: number;
}

@injectable()
class UpdateUserUseCase {
    constructor(@inject("UserRepository") private userRepository: IUserRepository) {}

    async execute(userId: number, userData: UserDTO): Promise<UserDTO>{
        const passwordHash = await hash(userData.password, 8);
        const userExist = await this.userRepository.findUserById(userId);
        const emailExist = await this.userRepository.findUserByEmail(userData.email);
        if(!userExist){
            throw new AppError("User Not Exists");
        }
        if(emailExist){
            throw new AppError("Email Already Exists")
        }
        userData.password = passwordHash;
        const userUpdated = await this.userRepository.updateUsers(userId, userData);
        return UserDTO.fromUser(userUpdated);
    }
}

export {UpdateUserUseCase}