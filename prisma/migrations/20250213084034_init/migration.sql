/*
  Warnings:

  - You are about to drop the column `name` on the `Doador` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Doador` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Doador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL
);
INSERT INTO "new_Doador" ("email", "id") SELECT "email", "id" FROM "Doador";
DROP TABLE "Doador";
ALTER TABLE "new_Doador" RENAME TO "Doador";
CREATE UNIQUE INDEX "Doador_email_key" ON "Doador"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
