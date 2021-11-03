import express, { Router, Request, Response } from "express";
import KecerdasanController from "../Controller/Group/Kecerdasan";
import KepribadianController from "../Controller/Group/Kepribadian";

const Routers: Router = express.Router();
const Kecerdasan = new KecerdasanController();
const Kepribadian = new KepribadianController();


Routers.get("/kecerdasan", Kecerdasan.findAll.bind(Kecerdasan));
Routers.post("/kecerdasan", Kecerdasan.insertData.bind(Kecerdasan));
Routers.post("/kecerdasan/activation", Kecerdasan.activation.bind(Kecerdasan));
Routers.delete("/kecerdasan/:secureId", Kecerdasan.deleteData.bind(Kecerdasan));

Routers.get("/kepribadian", Kepribadian.findAll.bind(Kepribadian));
Routers.post("/kepribadian", Kepribadian.insertData.bind(Kepribadian));
Routers.post("/kepribadian/activation", Kepribadian.activation.bind(Kepribadian));
Routers.delete("/kepribadian/:secureId", Kepribadian.deleteData.bind(Kepribadian));

export default Routers;