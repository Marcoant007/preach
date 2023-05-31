import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors"
import { router } from './routes'
import "../shared/container/index-cotainer"
import { AppError } from "../shared/error/AppError";

const port = 3333;
const server = express();
server.use(express.json());
server.use(router)
server.use((err: Error, request: Request, response:Response, next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({message: err.message});
    }
    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    })
});

server.listen(port, ()=> console.log(`Server is running ${port} 🚀 `));

export {server};