import { AppError } from "@types";
import { Request, Response, NextFunction } from "express";

export default async function errorHandler(
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  try {
    if (isErrorKnown(error)) {
      console.log(`
                \nAn App error was cast:
                code: ${error.code}
                message: ${error.message}
                thrown by: ${error.thrownBy}
            `);
      if ("originalError" in error) {
        console.log("AN ORIGINAL ERROR WAS PROVIDED: ");
        console.log(error.originalError);
      }
      return res.status(error.code).send(error.message);
    } else {
      console.log("! -> Erro desconhecido: ");
      console.log(error);
      return res
        .status(500)
        .send("Um erro desconhecido aconteceu no servidor.");
    }
  } catch (err) {
    console.error(
      "XXXXXXXXXXXXXXX- Error Handler Falhou ao Capturar Erro -XXXXXXXXXXXXXXXX"
    );
    console.error(err);
    console.error("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    return res.status(500).send("Um erro desconhecido aconteceu no servidor.");
  }
}

function isErrorKnown(errObj: Record<any, any>): boolean {
  const errorMandatoryKeys = ["code", "message", "thrownBy"];
  for (const key of errorMandatoryKeys) {
    if (key in errObj) {
      continue;
    }
    return false;
  }
  return true;
}
