/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Doador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "data_nascimento" DATETIME
);

-- CreateTable
CREATE TABLE "Voluntario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT
);

-- CreateTable
CREATE TABLE "Medicamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT
);

-- CreateTable
CREATE TABLE "Tratamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data_hora" DATETIME NOT NULL,
    "animal_id" INTEGER NOT NULL,
    "voluntario_id" INTEGER NOT NULL,
    CONSTRAINT "Tratamento_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tratamento_voluntario_id_fkey" FOREIGN KEY ("voluntario_id") REFERENCES "Voluntario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_MedicamentoToTratamento" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MedicamentoToTratamento_A_fkey" FOREIGN KEY ("A") REFERENCES "Medicamento" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MedicamentoToTratamento_B_fkey" FOREIGN KEY ("B") REFERENCES "Tratamento" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Doador_email_key" ON "Doador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Voluntario_cpf_key" ON "Voluntario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "_MedicamentoToTratamento_AB_unique" ON "_MedicamentoToTratamento"("A", "B");

-- CreateIndex
CREATE INDEX "_MedicamentoToTratamento_B_index" ON "_MedicamentoToTratamento"("B");
