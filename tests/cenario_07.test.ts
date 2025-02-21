import request from "supertest";
import app from "../src/app";
import { prisma } from "../src/utils/prismaClient";

describe("Cenário 7: Registro de Tratamentos", () => {
  let tratamentoId: number;

  afterAll(async () => {
    await prisma.tratamento.deleteMany();
    await prisma.$disconnect();
  });

  test("CT-25: Registrar um novo tratamento", async () => {
    const response = await request(app).post("/tratamentos").send({
      animalId: "123",
      medicamento: "Antibiótico",
      data: "2024-02-18",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    tratamentoId = response.body.id;
  });

  test("CT-26: Verificar se o tratamento foi salvo no banco", async () => {
    const tratamento = await prisma.tratamento.findUnique({
      where: { id: tratamentoId },
    });
    expect(tratamento).not.toBeNull();
  });

  test("CT-27: Retornar erro ao cadastrar tratamento sem informar data", async () => {
    const response = await request(app).post("/tratamentos").send({
      animalId: "123",
      medicamento: "Antibiótico",
    });
    expect(response.status).toBe(400);
  });

  test("CT-28: Retornar erro ao cadastrar tratamento com id de animal inválido", async () => {
    const response = await request(app).post("/tratamentos").send({
      animalId: "",
      medicamento: "Antibiótico",
      data: "2024-02-18",
    });
    expect(response.status).toBe(400);
  });
});
