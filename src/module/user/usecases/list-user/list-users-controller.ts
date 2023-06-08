import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../shared/error/app-error";
import { logger } from "../../../../shared/pino/pino-logger";
import { ListUsersUseCase } from "./list-users-usecase";

class ListAllUsersController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listUserUseCase = container.resolve(ListUsersUseCase);
        const all = await listUserUseCase.execute();
        return response.json(all);
    }
}

export { ListAllUsersController }