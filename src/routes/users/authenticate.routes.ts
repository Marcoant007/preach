import { Router } from "express";
import { AuthenticateUserController } from "../../module/user/usecases/authenticate-user/authenticate-controller";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController

authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes };