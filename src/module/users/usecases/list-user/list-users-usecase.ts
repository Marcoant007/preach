import { User } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/error/app-error";
import { logger } from "../../../../shared/pino/pino-logger";
import { IUserRepository } from "../../repository/interface/user-repository-interface";
import { UserDTO } from "../../dto/user-dto";

@injectable()
class ListUsersUseCase {
    constructor(
        @inject("UserRepository") private userRepository: IUserRepository
    ) { }

    async execute(): Promise<UserDTO[]> {
        try {
            const users = await this.userRepository.listAllUsers();
            const userDTOs = users.map(user => UserDTO.fromUser(user));
            return userDTOs;
        } catch (error) {
            logger.error(error);
            throw new AppError("[USECASE] - Ops.. Unable to register user", 500)
        }
    }
}

export { ListUsersUseCase };