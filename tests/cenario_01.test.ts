import request from "supertest";
import { prisma } from "../src/utils/prismaClient";
import app from "../src/app";

describe("Resgate de Animais", () => {
  let resgateId: number;

  afterAll(async () => {
    await prisma.resgate.deleteMany(); // Limpa os dados após os testes
    await prisma.$disconnect();
  });

  it("CT-01: Registrar um novo Resgate", async () => {
    const response = await request(app)
      .post("/resgate")
      .send({
        data_hora: "2024-02-17T18:25:43.511Z",
        local: "Centro CG",
        descricao: "",
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
          {
            nome: "Brutus",
            especie: "Cão",
            raca: "Vira-lata",
            genero: "Macho",
            idade_estimada: 4,
          },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    resgateId = response.body.id;
  });

  it("CT-02: Verificar se o resgate foi salvo no banco", async () => {
    const resgate = await prisma.resgate.findUnique({
      where: { id: resgateId },
    });
    expect(resgate).not.toBeNull();
  });

  it("CT-03: Retornar erro ao cadastrar um resgate sem local", async () => {
    const response = await request(app)
      .post("/resgate")
      .send({
        data_hora: "2024-02-17T18:25:43.511Z",
        descricao: "",
        animais: [
          {
            nome: "Tom",
            especie: "Gato",
            raca: "Vira-lata",
            genero: "Macho",
            idade_estimada: 3,
          },
        ],
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("CT-04: Retornar erro ao enviar animal com idade negativa", async () => {
    const response = await request(app)
      .post("/resgate")
      .send({
        data_hora: "2024-02-17T18:25:43.511Z",
        local: "Centro CG",
        descricao: "",
        animais: [
          {
            nome: "Tom",
            especie: "Gato",
            raca: "Vira-lata",
            genero: "Macho",
            idade_estimada: -3,
          },
        ],
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
