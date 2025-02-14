import { Router } from "express";
import * as RegistroController from "../controllers/registroPonto";

const registroPontoRouter = Router();

registroPontoRouter.get("/", RegistroController.handleGetAllRegistroPonto);
registroPontoRouter.post("/", RegistroController.handleAddRegistroPonto);

export default registroPontoRouter;
