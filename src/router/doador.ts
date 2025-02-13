import { handleAddDoador, handleGetAllDoador } from "@controllers/doador";
import { Router } from "express";

const doadorRouter = Router();

doadorRouter.get("/", handleGetAllDoador);
doadorRouter.post("/", handleAddDoador);

export default doadorRouter;
