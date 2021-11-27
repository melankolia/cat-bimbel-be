import express, { Router, Request, Response } from "express";
import NilaiController from "../Controller/Nilai";

const Routers: Router = express.Router();
const Controller = new NilaiController();

Routers.get("/", Controller.findAll.bind(Controller));
Routers.post("/", Controller.insertData.bind(Controller));

export default Routers;