import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/error/app-error";
import { UserRepository } from "../../module/user/repository/user-repository";

interface IPayload {
    sub: string;
    email: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    const authHeader = request.headers.authorization;
    const secretKey = process.env.SECRET_KEY || "6af628bcf43271e8ba377d80534653b1";

    if(!authHeader){
        throw new AppError("Token is Missing", 401);
    }

    const [, token] = authHeader.split(" ");
    try {
        const { sub: user_id, email } = verify(token, secretKey) as IPayload;
        const usersRepository = new UserRepository();
        const user = await usersRepository.findUserByEmail(email);

        if(!user){
            throw new AppError("User does not exists", 401);
        }

        request.user = {
            id: user_id
        }

        next();
    } catch (error) {
        throw new AppError("Invalid Token!", 401);
    }
}