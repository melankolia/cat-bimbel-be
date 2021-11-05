import express, { Router, Request, Response } from "express";
import KecerdasanController from "../Controller/Questions/Kecerdasan";
import KepribadianController from "../Controller/Questions/Kepribadian";

const Routers: Router = express.Router();
const Kecerdasan = new KecerdasanController();
const Kepribadian = new KepribadianController();

Routers.get("/kecerdasan", Kecerdasan.findAll.bind(Kecerdasan));
Routers.post("/kecerdasan", Kecerdasan.insertData.bind(Kecerdasan));
Routers.delete("/kecerdasan", Kecerdasan.deleteQuestion.bind(Kecerdasan));

Routers.get("/kepribadian", Kepribadian.findAll.bind(Kepribadian));
Routers.post("/kepribadian", Kepribadian.insertData.bind(Kepribadian));
Routers.delete("/kepribadian", Kepribadian.deleteQuestion.bind(Kepribadian));

export default Routers;