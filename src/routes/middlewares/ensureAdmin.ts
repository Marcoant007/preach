import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../module/user/repository/user-repository";
import { AppError } from "../../shared/error/app-error";

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;
    const userRepository = new UserRepository();
    const userDB = await userRepository.findUserByEmail(id);

    if(!userDB?.isAdmin){
        throw new AppError("User isn't admin!")
    }

    return next();
}