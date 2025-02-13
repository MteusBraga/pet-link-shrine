import { prisma } from "@/utils/prismaClient";
import { Request, Response } from "express";

export async function handleGetAllVoluntario(req: Request, res: Response) {
  const voluntarios = await prisma.voluntario.findMany();
  res.json(voluntarios);
}

export async function handleAddVoluntario(req: Request, res: Response) {
  const { cpf, nome, telefone } = req.body;
  const newVoluntario = await prisma.voluntario.create({
    data: {
      cpf,
      nome,
      telefone,
    },
  });
  res.json(newVoluntario);
}
