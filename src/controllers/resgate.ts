import { Request, Response } from "express";
import { prisma } from "../utils/prismaClient";
import { Http } from "@types";

export async function handleGetAllResgates(res: Response) {
  const resgates = prisma.resgate.findMany({
    include: { animal: true, voluntario: true },
  });
  res.status(Http.OK).send(resgates);
}

export async function handleAddResgate(req: Request, res: Response) {
  const { data_hora, local, descricao, animais, voluntarios } = req.body;
  //animais[{},{},{}]
  const resgate = await prisma.resgate.create({
    data: {
      data_hora,
      local,
      descricao,
      animal: {
        create: animais,
      },
      voluntario: {
        create: voluntarios,
      },
    },
  });
  return res.status(Http.CREATED).send(resgate);
}
