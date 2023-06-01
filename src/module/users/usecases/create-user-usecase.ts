import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repository/interface/user-repository-interface";
import { IUserDTO } from "../dto/user-dto";
import { hash } from "bcryptjs";
import { AppError } from "../../../shared/error/AppError";

@injectable()
class CreateUserUseCase {
    constructor(@inject("UserRepository") private userRepository: IUserRepository) { }

    async execute(userData: IUserDTO): Promise<void> {
        const passwordHash = await hash(userData.password, 8);

        const userEmailAlreadyExists = await this.userRepository.findUserByEmail(userData.email);

        if (userEmailAlreadyExists) {
            throw new AppError("User Already Exists", 400);
        }
        
        userData.password = passwordHash;
        await this.userRepository.createUser(userData);
    }
}

export { CreateUserUseCase }