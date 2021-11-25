import express, { Router, Request, Response } from "express";
import PeraturanController from "../Controller/Peraturan";

const Routers: Router = express.Router();
const Controller = new PeraturanController();

Routers.post("/", Controller.insertData.bind(Controller));
Routers.get("/", Controller.findAll.bind(Controller));


export default Routers;