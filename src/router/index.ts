import { Request, Response, Router } from "express";
import doadorRouter from "./doador";
import voluntarioRouter from "./voluntario";
import animalRouter from "./animal";

const mainRouter = Router();

mainRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send("Healthy app :)");
});

mainRouter.use("/animal", animalRouter);

export default mainRouter;
