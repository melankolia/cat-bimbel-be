import express, { Router, Request, Response, NextFunction } from "express";

// Routes
import User from "./Users";

const Routers: Router = express.Router();

Routers.use("/users", User);
Routers.use("/", (req: Request, res: Response, next: NextFunction): any =>
    res.send("Node JS Running")
);

export default Routers;