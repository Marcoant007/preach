import { Router } from "express";
import { AuthenticateUserController } from "../module/user/usecases/authenticate-user/authenticate-controller";
import { CreateUserController } from "../module/user/usecases/create-user/create-user-controller";
import { FindUserByEmailController } from "../module/user/usecases/find-user-email/find-user-email-controler";
import { ListAllUsersController } from "../module/user/usecases/list-user/list-users-controller";
import { UpdateUserController } from "../module/user/usecases/update-user/update-users-controller";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const listUserController = new ListAllUsersController();
const findUserByEmailController = new FindUserByEmailController();
const updateUserController = new UpdateUserController();
const authenticateUserController = new AuthenticateUserController()

usersRoutes.post("/session", authenticateUserController.handle);
usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", ensureAuthenticated, listUserController.handle);
usersRoutes.put("/:id", ensureAuthenticated, updateUserController.handle);
usersRoutes.get("/:email", ensureAuthenticated, findUserByEmailController.handle);


export default usersRoutes;