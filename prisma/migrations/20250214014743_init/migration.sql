/*
  Warnings:

  - Added the required column `idAnimal` to the `Adocao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Adocao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data_hora" DATETIME NOT NULL,
    "idAnimal" INTEGER NOT NULL,
    "idPretendente" INTEGER NOT NULL,
    CONSTRAINT "Adocao_idAnimal_fkey" FOREIGN KEY ("idAnimal") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Adocao_idPretendente_fkey" FOREIGN KEY ("idPretendente") REFERENCES "Pretendente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Adocao" ("data_hora", "id", "idPretendente") SELECT "data_hora", "id", "idPretendente" FROM "Adocao";
DROP TABLE "Adocao";
ALTER TABLE "new_Adocao" RENAME TO "Adocao";
CREATE UNIQUE INDEX "Adocao_idAnimal_key" ON "Adocao"("idAnimal");
CREATE UNIQUE INDEX "Adocao_idPretendente_key" ON "Adocao"("idPretendente");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
