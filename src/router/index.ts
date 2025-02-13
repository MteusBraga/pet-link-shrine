import { Request, Response, Router } from "express";
import animalRouter from "./animal";
import doadorRouter from "./doador";
import voluntarioRouter from "./voluntario";

const mainRouter = Router();

mainRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send("Healthy app :)");
});

mainRouter
  .use("/animal", animalRouter)
  .use("/doador", doadorRouter)
  .use("/voluntario", voluntarioRouter);

export default mainRouter;
