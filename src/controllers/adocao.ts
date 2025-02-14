import { Request, Response } from "express";
import { prisma } from "../utils/prismaClient";
import { Http } from "../@types";

export async function handleGetAllAdocoes(res: Response) {
  const adocao = await prisma.adocao.findMany({
    include: { pretendente: true },
  });
  res.status(Http.OK).send(adocao);
}

export async function handleAddAdocao(req: Request, res: Response) {
  const { idPretendente, data_hora, idAnimal } = req.body;
  const adocao = await prisma.adocao.create({
    data: {
      idPretendente,
      data_hora,
      idAnimal,
    },
  });
  res.status(Http.CREATED).send(adocao);
  return;
}
