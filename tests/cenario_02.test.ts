import request from "supertest";
import app from "../src/app";
import { prisma } from "../src/utils/prismaClient";

describe("Cenário 2: Alterações, remoção e listagem dos resgates", () => {
  let resgateId: string;

  beforeAll(async () => {
    const res = await request(app)
      .post("/resgates")
      .send({
        data_hora: "2024-02-17T18:25:43.511Z",
        local: "Centro CG",
        descricao: "Resgate de animais em situação de rua",
        animais: [
          {
            nome: "Tom",
            especie: "Gato",
            raca: "Vira-lata",
            genero: "Macho",
            idade_estimada: 3,
          },
          {
            nome: "Frajola",
            especie: "Gato",
            raca: "Vira-lata",
            genero: "Macho",
            idade_estimada: 2,
          },
        ],
      });
    resgateId = res.body.id;
  });

  afterAll(async () => {
    await prisma.resgate.deleteMany();
    await prisma.$disconnect();
  });

  test("CT-05: Alterar um resgate", async () => {
    const response = await request(app).patch(`/resgates/${resgateId}`).send({
      descricao: "Atualização da descrição do resgate",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id", resgateId);
  });

  test("CT-06: Remover um resgate", async () => {
    const response = await request(app).delete(`/resgates/${resgateId}`);
    expect(response.status).toBe(204);
  });

  test("CT-07: Alterar um resgate sem um id válido", async () => {
    const response = await request(app).patch("/resgates/invalid-id").send({
      descricao: "Tentativa de alteração com ID inválido",
    });
    expect(response.status).toBe(400);
  });

  test("CT-08: Listar todos os resgates", async () => {
    const response = await request(app).get("/resgates");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
