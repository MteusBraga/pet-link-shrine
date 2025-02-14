import { Http } from "@types";
import { prisma } from "../utils/prismaClient";
import { Request, Response } from "express";

export async function handleAddEscala(req: Request, res: Response) {
  const { dataFim, dataInit, horarioIni, horarioFim } = req.body;
  const newEscala = await prisma.escalaHorario.create({
    data: {
      dataFim,
      dataInit,
      horarioIni,
      horarioFim,
    },
  });
  res.status(Http.CREATED).send(newEscala);
}
