import { Router } from "express";
import * as PretendenteController from "../controllers/pretendente";

const pretendenteRouter = Router();
pretendenteRouter.get("/", PretendenteController.handleGetAllPretendentes);
pretendenteRouter.post("/", PretendenteController.handleAddPretendente);

export default pretendenteRouter;
