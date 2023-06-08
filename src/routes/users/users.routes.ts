import { Router } from "express";
import { CreateUserController } from "../../module/user/usecases/create-user/create-user-controller";
import { FindUserByEmailController } from "../../module/user/usecases/find-user-email/find-user-email-controler";
import { ListAllUsersController } from "../../module/user/usecases/list-user/list-users-controller";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const listUserController = new ListAllUsersController();
const findUserByEmailController = new FindUserByEmailController();


usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", ensureAuthenticated, listUserController.handle);
usersRoutes.get("/:email", ensureAuthenticated, findUserByEmailController.handle);


export default usersRoutes;