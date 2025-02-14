import * as AdocaoController from "../controllers/adocao";
import { Router } from "express";

const adocaoRouter = Router();

adocaoRouter.get("/", AdocaoController.handleGetAllAdocoes);
adocaoRouter.post("/", AdocaoController.handleAddAdocao);

export default adocaoRouter;
