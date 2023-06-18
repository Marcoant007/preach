import { Request, Response } from "express";
import { container } from "tsyringe";
import { LoginDTO } from "../user/dto/login-dto";
import { LoginUseCase } from "./login-usecase";

class LoginController {
    async handle(request: Request, response: Response):Promise<Response>{
        const userData: LoginDTO = request.body;
        const loginUseCase = container.resolve(LoginUseCase);
        const userLogin = await loginUseCase.execute(userData);
        return response.json(userLogin);
    }
}

export {LoginController}