import * as DoadorController from "@controllers/doador";
import { Router } from "express";

const doadorRouter = Router();

doadorRouter.get("/", DoadorController.handleGetAllDoador);
doadorRouter.post("/", DoadorController.handleAddDoador);

export default doadorRouter;
