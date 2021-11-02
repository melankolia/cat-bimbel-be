import express, { Router, Request, Response } from "express";
import UserController from "../Controller/User";

const Routers: Router = express.Router();
const Controller = new UserController();

Routers.post("/login", Controller.userLogin.bind(Controller));
Routers.post("/register", Controller.createUser.bind(Controller));
Routers.post("/update", Controller.updateUser.bind(Controller));
Routers.get("/list", Controller.findAllUser.bind(Controller));

export default Routers;