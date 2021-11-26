import express, { Router, Request, Response } from "express";
import KecerdasanController from "../Controller/Group/Kecerdasan";
import KepribadianController from "../Controller/Group/Kepribadian";
import KejiwaanController from "../Controller/Group/Kejiwaan";
import KecermatanController from "../Controller/Group/Kecermatan";
import AuthCheck from "../Utils/Helper/AuthCheck";

const Routers: Router = express.Router();
const Kecerdasan = new KecerdasanController();
const Kepribadian = new KepribadianController();
const Kejiwaan = new KejiwaanController();
const Kecermatan = new KecermatanController();

Routers.get("/kecerdasan", Kecerdasan.findAll.bind(Kecerdasan));
Routers.post("/kecerdasan", AuthCheck.isAdmin, Kecerdasan.insertData.bind(Kecerdasan));
Routers.post("/kecerdasan/activation", AuthCheck.isAdmin, Kecerdasan.activation.bind(Kecerdasan));
Routers.delete("/kecerdasan/:secureId", AuthCheck.isAdmin, Kecerdasan.deleteData.bind(Kecerdasan));

Routers.get("/kepribadian", Kepribadian.findAll.bind(Kepribadian));
Routers.post("/kepribadian", AuthCheck.isAdmin, Kepribadian.insertData.bind(Kepribadian));
Routers.post("/kepribadian/activation", AuthCheck.isAdmin, Kepribadian.activation.bind(Kepribadian));
Routers.delete("/kepribadian/:secureId", AuthCheck.isAdmin, Kepribadian.deleteData.bind(Kepribadian));

Routers.get("/kejiwaan", Kejiwaan.findAll.bind(Kejiwaan));
Routers.post("/kejiwaan", AuthCheck.isAdmin, Kejiwaan.insertData.bind(Kejiwaan));
Routers.post("/kejiwaan/activation", AuthCheck.isAdmin, Kejiwaan.activation.bind(Kejiwaan));
Routers.delete("/kejiwaan/:secureId", AuthCheck.isAdmin, Kejiwaan.deleteData.bind(Kejiwaan));

Routers.get("/kecermatan", Kecermatan.findAll.bind(Kecermatan));
Routers.post("/kecermatan", AuthCheck.isAdmin, Kecermatan.insertData.bind(Kecermatan));
Routers.post("/kecermatan/activation", AuthCheck.isAdmin, Kecermatan.activation.bind(Kecermatan));
Routers.delete("/kecermatan/:secureId", AuthCheck.isAdmin, Kecermatan.deleteData.bind(Kecermatan));

export default Routers;