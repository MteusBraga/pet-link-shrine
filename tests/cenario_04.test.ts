import request from "supertest";
import app from "../src/app";

describe("Testes de Adoção", () => {
  let adocaoId: string;

  beforeAll(async () => {
    // Criar uma adoção para testar alteração e remoção
    const response = await request(app)
      .post("/adocao")
      .send({
        animalId: "123",
        pretendenteId: "456",
        dataAdocao: "2024-02-17",
      });
    adocaoId = response.body.id;
  });

  test("CT-13 - Alterar uma adoção", async () => {
    const response = await request(app)
      .patch(`/adocao/${adocaoId}`)
      .send({ dataAdocao: "2024-02-18" });

    expect(response.status).toBe(200);
    expect(response.body.dataAdocao).toBe("2024-02-18");
  });

  test("CT-14 - Remover uma adoção", async () => {
    const response = await request(app).delete(`/adocao/${adocaoId}`);

    expect(response.status).toBe(204);
  });

  test("CT-15 - Listar todas as adoções", async () => {
    const response = await request(app).get("/adocao");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("CT-16 - Retornar erro ao alterar uma adoção inválida", async () => {
    const response = await request(app)
      .patch("/adocao/invalido")
      .send({ dataAdocao: "2024-02-18" });

    expect(response.status).toBe(400);
  });
});
