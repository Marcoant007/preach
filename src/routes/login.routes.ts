import { Router } from "express";
import { LoginController } from "../module/login/login-controller";
import { AuthenticateUserController } from "../module/user/usecases/authenticate-user/authenticate-controller";

const loginRoute = Router();

const loginController = new LoginController()

loginRoute.post("/login", loginController.handle);

export { loginRoute as authenticateRoutes };