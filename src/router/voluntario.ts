import {
  handleAddVoluntario,
  handleGetAllVoluntario,
} from "../controllers/voluntario";
import { Router } from "express";

const voluntarioRouter = Router();

voluntarioRouter.get("/", handleGetAllVoluntario);
voluntarioRouter.post("/", handleAddVoluntario);

export default voluntarioRouter;
