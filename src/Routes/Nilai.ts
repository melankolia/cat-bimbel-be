import express, { Router, Request, Response } from "express";
import NilaiController from "../Controller/Nilai";

const Routers: Router = express.Router();
const Controller = new NilaiController();

Routers.get("/", Controller.findAll.bind(Controller));
Routers.get("/kecermatan", Controller.findAllKecermatan.bind(Controller));
Routers.post("/", Controller.insertData.bind(Controller));
Routers.post("/kecermatan", Controller.insertDataKecermatan.bind(Controller));

export default Routers;