import { Router } from "express";
import { CreateUserController } from "../../module/users/usecases/create-user/create-user-controller";
import { FindUserByEmailController } from "../../module/users/usecases/find-user-email/find-user-email-controler";
import { ListAllUsersController } from "../../module/users/usecases/list-user/list-users-controller";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const listUserController = new ListAllUsersController();
const findUserByEmailController = new FindUserByEmailController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", listUserController.handle);
usersRoutes.get("/:email", findUserByEmailController.handle);

export default usersRoutes;