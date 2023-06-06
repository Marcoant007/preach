import { Router } from "express";
import { CreateUserController } from "../../module/users/usecases/create-user/create-user-controller";
import { ListAllUsersController } from "../../module/users/usecases/list-user/list-users-controller";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const listUserController = new ListAllUsersController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", listUserController.handle);

export default usersRoutes;