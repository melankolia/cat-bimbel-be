import express, { Router, Request, Response } from "express";
import KecerdasanController from "../Controller/Questions/Kecerdasan";

const Routers: Router = express.Router();
const Kecerdasan = new KecerdasanController();

Routers.get("/kecerdasan", Kecerdasan.findAll.bind(Kecerdasan));
Routers.delete("/kecerdasan", Kecerdasan.deleteQuestion.bind(Kecerdasan));

export default Routers;