import { Router } from "express";
import * as ResgateController from "../controllers/resgate";

const resgateRouter = Router();

resgateRouter.get("/", ResgateController.handleGetAllResgates);
resgateRouter.post("/", ResgateController.handleAddResgate);

export default resgateRouter;
