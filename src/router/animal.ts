import * as AnimalController from "../controllers/animal";
import { Router } from "express";

const animalRouter = Router();

animalRouter.get("/", AnimalController.handleGetAllAnimals);
// animalRouter.post("/", AnimalController.handleAddAnimal);

export default animalRouter;
