import express, { Router, Request, Response } from "express";
import KecerdasanController from "../Controller/Questions/Kecerdasan";
import KepribadianController from "../Controller/Questions/Kepribadian";
import KejiwaanController from "../Controller/Questions/Kejiwaan";
import KecermatanController from "../Controller/Questions/Kecermatan";
import AuthCheck from "../Utils/Helper/AuthCheck";


const Routers: Router = express.Router();
const Kecerdasan = new KecerdasanController();
const Kepribadian = new KepribadianController();
const Kejiwaan = new KejiwaanController();
const Kecermatan = new KecermatanController();

Routers.get("/kecerdasan", Kecerdasan.findAll.bind(Kecerdasan));
Routers.post("/kecerdasan", AuthCheck.isAdmin, Kecerdasan.insertData.bind(Kecerdasan));
Routers.delete("/kecerdasan", AuthCheck.isAdmin, Kecerdasan.deleteQuestion.bind(Kecerdasan));
Routers.post("/kecerdasan/upload", AuthCheck.isAdmin, Kecerdasan.uploadPhotos.bind(Kecerdasan));
Routers.delete("/kecerdasan/delete-photo", AuthCheck.isAdmin, Kecerdasan.deletePhotos.bind(Kecerdasan));

Routers.get("/kepribadian", Kepribadian.findAll.bind(Kepribadian));
Routers.post("/kepribadian", AuthCheck.isAdmin, Kepribadian.insertData.bind(Kepribadian));
Routers.delete("/kepribadian", AuthCheck.isAdmin, Kepribadian.deleteQuestion.bind(Kepribadian));

Routers.get("/kejiwaan", Kejiwaan.findAll.bind(Kejiwaan));
Routers.post("/kejiwaan", AuthCheck.isAdmin, Kejiwaan.insertData.bind(Kejiwaan));
Routers.delete("/kejiwaan", AuthCheck.isAdmin, Kejiwaan.deleteQuestion.bind(Kejiwaan));

Routers.get("/kecermatan", Kecermatan.findAll.bind(Kecermatan));
Routers.post("/kecermatan/section", AuthCheck.isAdmin, Kecermatan.insertSection.bind(Kecermatan));
Routers.post("/kecermatan/question", AuthCheck.isAdmin, Kecermatan.insertQuestion.bind(Kecermatan));
Routers.delete("/kecermatan/section", AuthCheck.isAdmin, Kecermatan.deleteSection.bind(Kecermatan));
Routers.delete("/kecermatan/question", AuthCheck.isAdmin, Kecermatan.deleteQuestion.bind(Kecermatan));

export default Routers;