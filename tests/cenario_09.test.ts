import request from "supertest";
import app from "../src/app"; // Ajuste para o caminho correto do app
import { prisma } from "../src/utils/prismaClient";

describe("Cenário 9: Registro de Escala e Ponto de Trabalho", () => {
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
  });

  afterAll(async () => {
    await prisma.registroPonto.deleteMany();
    await prisma.escalaHorario.deleteMany();
    await prisma.voluntario.deleteMany();
    await prisma.$disconnect();
  });

  test("CT-33 - Registrar uma escala de voluntário", async () => {
    const res = await request(app).post("/voluntarios/escala").send({
      voluntarioId,
      data: "2024-02-18",
      turno: "Manhã",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  test("CT-34 - Registrar um ponto de entrada de voluntário", async () => {
    const res = await request(app).post("/voluntarios/ponto").send({
      voluntarioId,
      tipo: "entrada",
      dataHora: "2024-02-18T08:00:00Z",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  test("CT-35 - Registrar um ponto de saída de voluntário", async () => {
    const res = await request(app).post("/voluntarios/ponto").send({
      voluntarioId,
      tipo: "saida",
      dataHora: "2024-02-18T12:00:00Z",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  test("CT-36 - Tentar registrar um ponto de saída sem ter um ponto de entrada", async () => {
    const res = await request(app).post("/voluntarios/ponto").send({
      voluntarioId: "voluntario-invalido",
      tipo: "saida",
      dataHora: "2024-02-18T12:00:00Z",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
