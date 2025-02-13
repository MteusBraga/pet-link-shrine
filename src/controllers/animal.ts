import { prisma } from "@/utils/prismaClient";
import { Request, Response } from "express";

export async function handleGetAllAnimals(req: Request, res: Response) {
  const animals = await prisma.animal.findMany();
  res.json(animals);
}

export async function handleAddAnimal(req: Request, res: Response) {
  const { nome, especie, raca, idade_estimada, genero } = req.body;
  const newAnimal = await prisma.animal.create({
    data: {
      nome,
      especie,
      raca,
      idade_estimada,
      genero,
    },
  });
  res.json(newAnimal);
}
