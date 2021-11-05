import express, { Router, Request, Response } from "express";
import KecerdasanController from "../Controller/Questions/Kecerdasan";
import KepribadianController from "../Controller/Questions/Kepribadian";
import KejiwaanController from "../Controller/Questions/Kejiwaan";

const Routers: Router = express.Router();
const Kecerdasan = new KecerdasanController();
const Kepribadian = new KepribadianController();
const Kejiwaan = new KejiwaanController();

Routers.get("/kecerdasan", Kecerdasan.findAll.bind(Kecerdasan));
Routers.post("/kecerdasan", Kecerdasan.insertData.bind(Kecerdasan));
Routers.delete("/kecerdasan", Kecerdasan.deleteQuestion.bind(Kecerdasan));

Routers.get("/kepribadian", Kepribadian.findAll.bind(Kepribadian));
Routers.post("/kepribadian", Kepribadian.insertData.bind(Kepribadian));
Routers.delete("/kepribadian", Kepribadian.deleteQuestion.bind(Kepribadian));

Routers.get("/kejiwaan", Kejiwaan.findAll.bind(Kejiwaan));
Routers.post("/kejiwaan", Kejiwaan.insertData.bind(Kejiwaan));
Routers.delete("/kejiwaan", Kejiwaan.deleteQuestion.bind(Kejiwaan));

export default Routers;