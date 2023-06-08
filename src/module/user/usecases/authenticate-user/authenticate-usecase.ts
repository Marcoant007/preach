import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import crypto from "crypto";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/error/app-error";
import { IRequestAuth, IResponseAuth } from "../../dto/auth-dto";
import { IUserRepository } from "../../repository/interface/user-repository-interface";
import { logger } from "../../../../shared/pino/pino-logger";

@injectable()
class AuthenticateUserUseCase {
    constructor(@inject("UserRepository") private usersRepository: IUserRepository) { }

    async execute({ email, password }: IRequestAuth): Promise<IResponseAuth> {
        try {
            const user = await this.usersRepository.findUserByEmail(email);

            const secretKey = process.env.SECRET_KEY || "6af628bcf43271e8ba377d80534653b1";

            if (!user) {
                throw new AppError("Email or password incorrect!", 400);
            }

            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                throw new AppError("Email or password incorrect", 400);
            }

            const token = sign({}, secretKey, {
                subject: user.email,
                expiresIn: "1d"
            });

            const tokenReturn: IResponseAuth = {
                token,
                user: {
                    name: user.username,
                    email: user.email
                }
            };

            return tokenReturn;
        } catch (error) {
            logger.error(error)
            throw new AppError("Ops Error to authenticate user")
        }
    }
}

export { AuthenticateUserUseCase }