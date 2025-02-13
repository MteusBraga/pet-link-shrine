import { prisma } from "@/utils/prismaClient";
import { Request, Response } from "express";

export async function handleGetAllDoador(req: Request, res: Response) {
  const doadores = await prisma.doador.findMany();
  res.json(doadores);
}

export async function handleAddDoador(req: Request, res: Response) {
  const { email, nome } = req.body;
  const newDoador = await prisma.doador.create({
    data: {
      email,
      nome,
    },
  });
  res.json(newDoador);
}
