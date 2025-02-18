import { Request, Response } from "express";
import { prisma } from "../utils/prismaClient";
import { Http } from "../@types";

export async function handleGetAllRegistroPonto(res: Response) {
  const pontos = prisma.registroPonto.findMany({
    include: { voluntario: true },
  });
  res.status(Http.OK).send(pontos);
}

export async function handleAddRegistroPonto(req: Request, res: Response) {
  const { idVoluntario, dataHora } = req.body;
  const ponto = await prisma.registroPonto.create({
    data: {
      idVoluntario,
      dataHora,
    },
  });
  res.status(Http.CREATED).send(ponto);
  return;
}
