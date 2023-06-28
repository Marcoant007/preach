import { User } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/error/app-error";
import { logger } from "../../../../shared/pino/pino-logger";
import { IUserRepository } from "../../repository/user-repository-interface";
import { UserDTO } from "../../dto/user-dto";

@injectable()
class ListUsersUseCase {
    constructor(
        @inject("UserRepository") private userRepository: IUserRepository) { }

    async execute(): Promise<UserDTO[]> {
        try {
            const users = await this.userRepository.listAllUsers();
            const userDTO = users.map(user => UserDTO.fromUser(user));
            return userDTO;
        } catch (error) {
            logger.error(error);
            throw new AppError("Ops.. Unable to register user", 500)
        }
    }
}

export { ListUsersUseCase };