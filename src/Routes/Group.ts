import express, { Router, Request, Response } from "express";
import KecerdasanController from "../Controller/Group/Kecerdasan";

const Routers: Router = express.Router();
const Kecerdasan = new KecerdasanController();

Routers.get("/kecerdasan", Kecerdasan.findAll.bind(Kecerdasan));
Routers.post("/kecerdasan", Kecerdasan.insertData.bind(Kecerdasan));
Routers.post("/kecerdasan/activation", Kecerdasan.activation.bind(Kecerdasan));
Routers.delete("/kecerdasan/:secureId", Kecerdasan.deleteData.bind(Kecerdasan));

export default Routers;