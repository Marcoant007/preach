import { Router } from "express";
import { authenticateRoutes } from "./users/authenticate.routes";
import usersRoutes from "./users/users.routes";

const router = Router();

router.use('/users', usersRoutes);
router.use(authenticateRoutes);

export {router};