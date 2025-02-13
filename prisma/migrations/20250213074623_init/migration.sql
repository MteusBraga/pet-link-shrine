/*
  Warnings:

  - You are about to drop the column `data_nascimento` on the `Animal` table. All the data in the column will be lost.
  - Added the required column `genero` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idade_estimada` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raca` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Made the column `telefone` on table `Voluntario` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Resgate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data_hora" DATETIME NOT NULL,
    "local" TEXT NOT NULL,
    "descricao" TEXT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "idade_estimada" INTEGER NOT NULL
);
INSERT INTO "new_Animal" ("especie", "id", "nome") SELECT "especie", "id", "nome" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
CREATE TABLE "new_Voluntario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL
);
INSERT INTO "new_Voluntario" ("cpf", "id", "nome", "telefone") SELECT "cpf", "id", "nome", "telefone" FROM "Voluntario";
DROP TABLE "Voluntario";
ALTER TABLE "new_Voluntario" RENAME TO "Voluntario";
CREATE UNIQUE INDEX "Voluntario_cpf_key" ON "Voluntario"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
