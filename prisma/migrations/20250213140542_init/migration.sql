/*
  Warnings:

  - You are about to drop the column `voluntario_id` on the `Tratamento` table. All the data in the column will be lost.
  - Made the column `especie` on table `Animal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `genero` on table `Animal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idade_estimada` on table `Animal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nome` on table `Animal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `raca` on table `Animal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Doador` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nome` on table `Doador` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `idDoador` to the `Medicamento` table without a default value. This is not possible if the table is not empty.
  - Made the column `data_hora` on table `Resgate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descricao` on table `Resgate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `local` on table `Resgate` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `idVoluntario` to the `Tratamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idEscala` to the `Voluntario` table without a default value. This is not possible if the table is not empty.
  - Made the column `cpf` on table `Voluntario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nome` on table `Voluntario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefone` on table `Voluntario` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Pretendente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contato" TEXT NOT NULL,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Adocao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data_hora" DATETIME NOT NULL,
    "idPretendente" INTEGER NOT NULL,
    CONSTRAINT "Adocao_idPretendente_fkey" FOREIGN KEY ("idPretendente") REFERENCES "Pretendente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EscalaHorario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataInit" DATETIME NOT NULL,
    "dataFim" DATETIME NOT NULL,
    "horarioIni" DATETIME NOT NULL,
    "horarioFim" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RegistroPonto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idVoluntario" INTEGER NOT NULL,
    CONSTRAINT "RegistroPonto_idVoluntario_fkey" FOREIGN KEY ("idVoluntario") REFERENCES "Voluntario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AnimalToResgate" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AnimalToResgate_A_fkey" FOREIGN KEY ("A") REFERENCES "Animal" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AnimalToResgate_B_fkey" FOREIGN KEY ("B") REFERENCES "Resgate" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ResgateToVoluntario" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ResgateToVoluntario_A_fkey" FOREIGN KEY ("A") REFERENCES "Resgate" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ResgateToVoluntario_B_fkey" FOREIGN KEY ("B") REFERENCES "Voluntario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
INSERT INTO "new_Animal" ("especie", "genero", "id", "idade_estimada", "nome", "raca") SELECT "especie", "genero", "id", "idade_estimada", "nome", "raca" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
CREATE TABLE "new_Doador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL
);
INSERT INTO "new_Doador" ("email", "id", "nome") SELECT "email", "id", "nome" FROM "Doador";
DROP TABLE "Doador";
ALTER TABLE "new_Doador" RENAME TO "Doador";
CREATE UNIQUE INDEX "Doador_email_key" ON "Doador"("email");
CREATE TABLE "new_Medicamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "idDoador" INTEGER NOT NULL,
    CONSTRAINT "Medicamento_idDoador_fkey" FOREIGN KEY ("idDoador") REFERENCES "Doador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Medicamento" ("descricao", "id", "nome") SELECT "descricao", "id", "nome" FROM "Medicamento";
DROP TABLE "Medicamento";
ALTER TABLE "new_Medicamento" RENAME TO "Medicamento";
CREATE TABLE "new_Resgate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data_hora" DATETIME NOT NULL,
    "local" TEXT NOT NULL,
    "descricao" TEXT NOT NULL
);
INSERT INTO "new_Resgate" ("data_hora", "descricao", "id", "local") SELECT "data_hora", "descricao", "id", "local" FROM "Resgate";
DROP TABLE "Resgate";
ALTER TABLE "new_Resgate" RENAME TO "Resgate";
CREATE TABLE "new_Tratamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data_hora" DATETIME NOT NULL,
    "animal_id" INTEGER NOT NULL,
    "idVoluntario" INTEGER NOT NULL,
    CONSTRAINT "Tratamento_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tratamento_idVoluntario_fkey" FOREIGN KEY ("idVoluntario") REFERENCES "Voluntario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tratamento" ("animal_id", "data_hora", "id") SELECT "animal_id", "data_hora", "id" FROM "Tratamento";
DROP TABLE "Tratamento";
ALTER TABLE "new_Tratamento" RENAME TO "Tratamento";
CREATE TABLE "new_Voluntario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "idEscala" INTEGER NOT NULL,
    CONSTRAINT "Voluntario_idEscala_fkey" FOREIGN KEY ("idEscala") REFERENCES "EscalaHorario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Voluntario" ("cpf", "id", "nome", "telefone") SELECT "cpf", "id", "nome", "telefone" FROM "Voluntario";
DROP TABLE "Voluntario";
ALTER TABLE "new_Voluntario" RENAME TO "Voluntario";
CREATE UNIQUE INDEX "Voluntario_cpf_key" ON "Voluntario"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Adocao_idPretendente_key" ON "Adocao"("idPretendente");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimalToResgate_AB_unique" ON "_AnimalToResgate"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimalToResgate_B_index" ON "_AnimalToResgate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ResgateToVoluntario_AB_unique" ON "_ResgateToVoluntario"("A", "B");

-- CreateIndex
CREATE INDEX "_ResgateToVoluntario_B_index" ON "_ResgateToVoluntario"("B");
