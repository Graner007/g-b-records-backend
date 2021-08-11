/*
  Warnings:

  - Made the column `recordId` on table `CartItem` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CartItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "albumCover" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,
    "recordId" INTEGER NOT NULL,
    FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CartItem" ("albumCover", "cartId", "id", "name", "price", "quantity", "recordId") SELECT "albumCover", "cartId", "id", "name", "price", "quantity", "recordId" FROM "CartItem";
DROP TABLE "CartItem";
ALTER TABLE "new_CartItem" RENAME TO "CartItem";
CREATE UNIQUE INDEX "CartItem.recordId_unique" ON "CartItem"("recordId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
