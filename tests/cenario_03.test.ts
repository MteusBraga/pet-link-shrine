import request from "supertest";
import app from "../src/app"; // Importa a aplicação Express
import { prisma } from "../src/utils/prismaClient"; // Importa o Prisma Client

describe("Cenário 3: Registro de Adoção", () => {
  let adocaoId: number;

  afterAll(async () => {
    await prisma.adocao.deleteMany();
    await prisma.$disconnect();
  });

  test("CT-09: Registrar uma adoção", async () => {
    const response = await request(app).post("/adocao").send({
      animalId: "123",
      pretendenteId: "456",
      dataAdocao: "2024-02-17",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    adocaoId = response.body.id;
  });

  test("CT-10: Verificar se a adoção foi salva no banco", async () => {
    const adocao = await prisma.adocao.findUnique({ where: { id: adocaoId } });
    expect(adocao).not.toBeNull();
  });

  test("CT-11: Retornar erro ao cadastrar uma adoção sem um pretendente válido", async () => {
    const response = await request(app)
      .post("/adocao")
      .send({ animalId: "123", pretendenteId: "", dataAdocao: "2024-02-17" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  test("CT-12: Retornar erro ao cadastrar uma adoção sem um animal válido", async () => {
    const response = await request(app)
      .post("/adocao")
      .send({ animalId: "", pretendenteId: "456", dataAdocao: "2024-02-17" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
