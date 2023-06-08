import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../shared/error/app-error";
import { logger } from "../../../../shared/pino/pino-logger";
import { FindUserByEmailUseCase } from "./find-user-email-usecase";

class FindUserByEmailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.params;
        const findUserByEmailUseCase = container.resolve(FindUserByEmailUseCase);
        const userDTO = await findUserByEmailUseCase.execute(email);
        return response.json(userDTO);
    }
}

export { FindUserByEmailController }