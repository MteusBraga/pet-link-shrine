import request from "supertest";
import app from "../src/app"; // Substitua pelo caminho correto do seu app
import { prisma } from "../src/utils/prismaClient";

describe("Cenário 5: Registro de um Novo Item no Estoque", () => {
  let itemId: number;

  afterAll(async () => {
    await prisma.medicamento.deleteMany(); // Limpa os itens de teste
    await prisma.$disconnect();
  });

  test("CT-17: Registrar um novo item no estoque", async () => {
    const response = await request(app).post("/estoque").send({
      doadorId: "453",
      nome: "Ração",
      quantidade: 10,
      tipo: "Alimento",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    itemId = response.body.id;
  });

  test("CT-18: Verificar se o item foi salvo no banco", async () => {
    const item = await prisma.medicamento.findUnique({ where: { id: itemId } });
    expect(item).not.toBeNull();
    expect(item?.nome).toBe("Ração");
  });

  test("CT-19: Retornar erro ao cadastrar um item sem informar o tipo", async () => {
    const response = await request(app).post("/estoque").send({
      doadorId: "453",
      nome: "Ração",
      quantidade: 10,
      tipo: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  test("CT-20: Retornar erro ao cadastrar item sem doador válido", async () => {
    const response = await request(app).post("/estoque").send({
      doadorId: "",
      nome: "Ração",
      quantidade: 10,
      tipo: "Alimento",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
