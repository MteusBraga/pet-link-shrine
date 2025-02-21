import request from "supertest";
import app from "../src/app";

describe("Cenário 8: Alterações, Remoção e Listagem de Tratamentos", () => {
  let tratamentoId: string;

  beforeAll(async () => {
    // Criar um tratamento para testes de alteração e remoção
    const response = await request(app).post("/tratamentos").send({
      animalId: "123",
      medicamento: "Antibiótico",
      data: "2024-02-18",
    });
    tratamentoId = response.body.id;
  });

  test("CT-29: Alterar um tratamento", async () => {
    const response = await request(app)
      .patch(`/tratamentos/${tratamentoId}`)
      .send({ medicamento: "Anti-inflamatório" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", tratamentoId);
    expect(response.body).toHaveProperty("medicamento", "Anti-inflamatório");
  });

  test("CT-30: Remover um tratamento", async () => {
    const response = await request(app).delete(`/tratamentos/${tratamentoId}`);

    expect(response.status).toBe(204);
  });

  test("CT-31: Listar todos os tratamentos", async () => {
    const response = await request(app).get("/tratamentos");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("CT-32: Retornar erro ao alterar tratamento com ID inválido", async () => {
    const response = await request(app)
      .patch("/tratamentos/invalido")
      .send({ medicamento: "Anti-inflamatório" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
