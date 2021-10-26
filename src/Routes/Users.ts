import express, { Router, Request, Response } from "express";
import UserController from "../Controller/User";

const Routers: Router = express.Router();
const Controller = new UserController();

Routers.post("/login", Controller.userLogin.bind(Controller));

export default Routers;