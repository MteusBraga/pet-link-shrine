import { Router } from "express";
import * as EscalaController from "../controllers/escala";

const escalaRouter = Router();

escalaRouter.post("/", EscalaController.handleAddEscala);

export default escalaRouter;
