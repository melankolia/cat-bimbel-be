import express, { Router, Request, Response, NextFunction } from "express";
import AuthCheck from "../Utils/Helper/AuthCheck";

// Routes
import User from "./Users";
import Group from "./Group";

const Routers: Router = express.Router();

Routers.use("/users", User);
Routers.use("/groups", AuthCheck.token, Group)
Routers.use("/", (req: Request, res: Response, next: NextFunction): any =>
    res.send("Node JS Running")
);

export default Routers;