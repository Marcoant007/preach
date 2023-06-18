import { Router } from "express";
import { authenticateRoutes } from "./login.routes";
import usersRoutes from "./users.routes";

const router = Router();

router.use('/users', usersRoutes);
router.use(authenticateRoutes);

export {router};