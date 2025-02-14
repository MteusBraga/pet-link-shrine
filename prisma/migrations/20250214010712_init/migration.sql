/*
  Warnings:

  - Added the required column `dataHora` to the `RegistroPonto` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RegistroPonto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataHora" DATETIME NOT NULL,
    "idVoluntario" INTEGER NOT NULL,
    CONSTRAINT "RegistroPonto_idVoluntario_fkey" FOREIGN KEY ("idVoluntario") REFERENCES "Voluntario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RegistroPonto" ("id", "idVoluntario") SELECT "id", "idVoluntario" FROM "RegistroPonto";
DROP TABLE "RegistroPonto";
ALTER TABLE "new_RegistroPonto" RENAME TO "RegistroPonto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
