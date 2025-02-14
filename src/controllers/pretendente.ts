import { Http } from "@types";
import { prisma } from "../utils/prismaClient";
import { Request, Response } from "express";

export async function handleAddPretendente(req: Request, res: Response) {
  const { contato, nome } = req.body;
  const pretendente = await prisma.pretendente.create({
    data: {
      contato,
      nome,
    },
  });

  res.status(Http.CREATED).send(pretendente);
  return;
}

export async function handleGetAllPretendentes(req: Request, res: Response) {
  const pretendente = await prisma.pretendente.findMany({
    include: { adocao: true },
  });

  res.status(Http.OK).send(pretendente);
  return;
}
