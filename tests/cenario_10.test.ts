import request from "supertest";
import app from "../src/app"; // Ajuste para o caminho correto do app
import { prisma } from "../src/utils/prismaClient"; // Ajuste para o caminho correto do Prisma

describe("Cenário 10: Listagem de Entrada e Saída por Voluntário", () => {
  let voluntarioId: number;

  beforeAll(async () => {
    // Criando um voluntário para os testes
    const voluntario = await prisma.voluntario.create({
      data: {
        nome: "Maria Souza",
        cpf: "812938121",
        telefone: "234482903",
        idEscala: 1,
      },
    });
    voluntarioId = voluntario.id;

    // Criando registros de entrada e saída
    await prisma.registroPonto.createMany({
      data: [
        {
          idVoluntario: voluntarioId,
          dataHora: new Date("2024-02-18T12:00:00Z"),
        },
        {
          idVoluntario: voluntarioId,
          dataHora: new Date("2024-02-18T12:00:00Z"),
        },
      ],
    });
  });

  afterAll(async () => {
    await prisma.registroPonto.deleteMany();
    await prisma.voluntario.deleteMany();
    await prisma.$disconnect();
  });

  test("CT-37 - Listar entradas e saídas de um voluntário", async () => {
    const res = await request(app).get(`/voluntarios/horarios/${voluntarioId}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toHaveLength(2);
  });

  test("CT-38 - Listar apenas entradas de um voluntário", async () => {
    const res = await request(app).get(
      `/voluntarios/horarios/${voluntarioId}?tipo=entrada`
    );

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBe(1);
    expect(res.body[0].tipo).toBe("entrada");
  });

  test("CT-39 - Listar apenas saídas de um voluntário", async () => {
    const res = await request(app).get(
      `/voluntarios/horarios/${voluntarioId}?tipo=saida`
    );

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBe(1);
    expect(res.body[0].tipo).toBe("saida");
  });

  test("CT-40 - Tentar listar horários de um voluntário inexistente", async () => {
    const res = await request(app).get("/voluntarios/horarios/999");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
