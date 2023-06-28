import { Router } from "express";
import { authenticateRoutes } from "./login.routes";
import usersRoutes from "./users.routes";
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../utils/swagger.json';

const router = Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
router.use('/users', usersRoutes);
router.use(authenticateRoutes);

export {router};