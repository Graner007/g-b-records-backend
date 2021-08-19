/*
  Warnings:

  - You are about to drop the column `type` on the `Media` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "linkUrl" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Media" ("id", "name") SELECT "id", "name" FROM "Media";
DROP TABLE "Media";
ALTER TABLE "new_Media" RENAME TO "Media";
CREATE UNIQUE INDEX "Media.name_unique" ON "Media"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
