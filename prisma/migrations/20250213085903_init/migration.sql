-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "especie" TEXT,
    "raca" TEXT,
    "genero" TEXT,
    "idade_estimada" INTEGER
);
INSERT INTO "new_Animal" ("especie", "genero", "id", "idade_estimada", "nome", "raca") SELECT "especie", "genero", "id", "idade_estimada", "nome", "raca" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
CREATE TABLE "new_Doador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "email" TEXT
);
INSERT INTO "new_Doador" ("email", "id", "nome") SELECT "email", "id", "nome" FROM "Doador";
DROP TABLE "Doador";
ALTER TABLE "new_Doador" RENAME TO "Doador";
CREATE UNIQUE INDEX "Doador_email_key" ON "Doador"("email");
CREATE TABLE "new_Resgate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data_hora" DATETIME,
    "local" TEXT,
    "descricao" TEXT
);
INSERT INTO "new_Resgate" ("data_hora", "descricao", "id", "local") SELECT "data_hora", "descricao", "id", "local" FROM "Resgate";
DROP TABLE "Resgate";
ALTER TABLE "new_Resgate" RENAME TO "Resgate";
CREATE TABLE "new_Voluntario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "cpf" TEXT,
    "telefone" TEXT
);
INSERT INTO "new_Voluntario" ("cpf", "id", "nome", "telefone") SELECT "cpf", "id", "nome", "telefone" FROM "Voluntario";
DROP TABLE "Voluntario";
ALTER TABLE "new_Voluntario" RENAME TO "Voluntario";
CREATE UNIQUE INDEX "Voluntario_cpf_key" ON "Voluntario"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
