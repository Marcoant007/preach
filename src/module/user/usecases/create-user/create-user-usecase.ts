import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repository/user-repository-interface";
import { UserDTO } from "../../dto/user-dto";
import { hash } from "bcryptjs";
import { AppError } from "../../../../shared/error/app-error";
import { logger } from "../../../../shared/pino/pino-logger";

@injectable()
class CreateUserUseCase {
    constructor(@inject("UserRepository") private userRepository: IUserRepository) { }

    async execute(userData: UserDTO): Promise<UserDTO> {
            const passwordHash = await hash(userData.password, 8);
            const userEmailAlreadyExists = await this.userRepository.findUserByEmail(userData.email);
            if (userEmailAlreadyExists) {
                throw new AppError("User Already Exists", 400);
            }
            userData.password = passwordHash;
            const user = await this.userRepository.createUser(userData);
            return UserDTO.fromUser(user);
        
    }
}

export { CreateUserUseCase }