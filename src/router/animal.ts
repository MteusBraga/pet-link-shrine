import { handleAddAnimal, handleGetAllAnimals } from "@controllers/animal";
import { Router } from "express";

const animalRouter = Router();

animalRouter.get("/", handleGetAllAnimals);
animalRouter.post("/", handleAddAnimal);

export default animalRouter;
