import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./update-users-usecase";

class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response>{
        const { id } = request.params;
        const userBody = request.body;
        const updateUserUseCase = container.resolve(UpdateUserUseCase);
        const userUpdated = await updateUserUseCase.execute(+id, userBody);
        return response.status(201).json(userUpdated);
    }
}

export {UpdateUserController}