import { Router } from "express";
import {
    userLoginController,
    userRegisterController,
} from "../controllers/user.controllers.js";

export const UserRouter = Router();

UserRouter.post("/register", userRegisterController);
UserRouter.post("/login", userLoginController);
