import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repository/interface/user-repository-interface";
import { IUserDTO } from "../../dto/user-dto";
import { hash } from "bcryptjs";
import { AppError } from "../../../../shared/error/app-error";
import { logger } from "../../../../shared/pino/pino-logger";

@injectable()
class CreateUserUseCase {
    constructor(@inject("UserRepository") private userRepository: IUserRepository) { }

    async execute(userData: IUserDTO): Promise<void> {
        try {
            const passwordHash = await hash(userData.password, 8);
            const userEmailAlreadyExists = await this.userRepository.findUserByEmail(userData.email);
            if (userEmailAlreadyExists) {
                throw new AppError("User Already Exists", 400);
            }
            userData.password = passwordHash;
            await this.userRepository.createUser(userData);
        } catch (error) {
            logger.error(error);
            throw new AppError("Ops.. Unable to register user", 500)
        }
    }
}

export { CreateUserUseCase }