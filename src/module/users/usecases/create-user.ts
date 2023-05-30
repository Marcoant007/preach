import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../interface/user-repository-interface";
import { IUserDTO } from "../dto/user-dto";
import { hash } from "bcryptjs";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
        ) { }

    async execute(userData: IUserDTO): Promise<void> {
        const passwordHash = await hash(userData.password, 8);

        const userAlreadyExists = await this.userRepository.findUserByEmail(userData.email);
        
        if(userAlreadyExists){
            throw new Error("User Already Exists" + 400);
        }

        userData.password = passwordHash;

        await this.userRepository.createUser(userData);
    }
}

export { CreateUserUseCase }