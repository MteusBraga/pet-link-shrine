import { Request, Response, Router } from "express";
import doadorRouter from "./doador";
import voluntarioRouter from "./voluntario";
import animalRouter from "./animal";
import resgateRouter from "./resgate";
import escalaRouter from "./escala";
import registroPontoRouter from "./registroPonto";

const mainRouter = Router();

mainRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send("Healthy app :)");
});

mainRouter
  .use("/animal", animalRouter)
  .use("/doador", doadorRouter)
  .use("/voluntario", voluntarioRouter)
  .use("/resgate", resgateRouter)
  .use("/escala", escalaRouter)
  .use("/registroPonto", registroPontoRouter);

export default mainRouter;
