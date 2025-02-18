import request from "supertest";
import app from "../src/app"; // Importe o app Express

describe("Gerenciamento de Estoque", () => {
  let itemId: string;

  beforeAll(async () => {
    // Cria um item no estoque para ser usado nos testes
    const response = await request(app)
      .post("/estoque")
      .send({ descricao: "Ração para cães", quantidade: 10 });
    itemId = response.body.id;
  });

  // CT-21: Alterar um item no estoque
  it("deve alterar a quantidade de um item no estoque", async () => {
    const response = await request(app)
      .patch(`/estoque/${itemId}`)
      .send({ quantidade: 20 });

    expect(response.status).toBe(200);
    expect(response.body.quantidade).toBe(20);
  });

  // CT-22: Remover um item do estoque
  it("deve remover um item do estoque", async () => {
    const response = await request(app).delete(`/estoque/${itemId}`);

    expect(response.status).toBe(204);
  });

  // CT-23: Listar todos os itens do estoque
  it("deve listar todos os itens do estoque", async () => {
    const response = await request(app).get("/estoque");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // CT-24: Retornar erro ao alterar um item com ID inválido
  it("deve retornar erro 400 ao tentar alterar um item com ID inválido", async () => {
    const response = await request(app)
      .patch("/estoque/id-invalido")
      .send({ quantidade: 20 });

    expect(response.status).toBe(400);
  });
});
