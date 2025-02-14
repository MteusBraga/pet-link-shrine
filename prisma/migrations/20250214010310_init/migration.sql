/*
  Warnings:

  - You are about to drop the `_AnimalToResgate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idResgate` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_AnimalToResgate_B_index";

-- DropIndex
DROP INDEX "_AnimalToResgate_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AnimalToResgate";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "idade_estimada" INTEGER NOT NULL,
    "idResgate" INTEGER NOT NULL,
    CONSTRAINT "Animal_idResgate_fkey" FOREIGN KEY ("idResgate") REFERENCES "Resgate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Animal" ("especie", "genero", "id", "idade_estimada", "nome", "raca") SELECT "especie", "genero", "id", "idade_estimada", "nome", "raca" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
