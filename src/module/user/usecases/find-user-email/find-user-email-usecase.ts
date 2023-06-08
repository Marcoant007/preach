import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/error/app-error";
import { logger } from "../../../../shared/pino/pino-logger";
import { UserDTO } from "../../dto/user-dto";
import { IUserRepository } from "../../repository/interface/user-repository-interface";

@injectable()
class FindUserByEmailUseCase {
    constructor(
        @inject("UserRepository") private userRepository: IUserRepository) { }

    async execute(email: string): Promise<UserDTO> {
        try {
            const user = await this.userRepository.findUserByEmail(email);
            if(!user){
                throw new AppError("User does not exists", 404)
            }
            return UserDTO.fromUser(user);
        } catch (error) {
            logger.error(error);
            throw new AppError("Ops.. Unable to register user", 500)
        }
    }
}

export { FindUserByEmailUseCase };