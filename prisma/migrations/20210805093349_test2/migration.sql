/*
  Warnings:

  - You are about to drop the column `quantity` on the `WishlistItem` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Wishlist` table. All the data in the column will be lost.
  - You are about to drop the column `orderDate` on the `Wishlist` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `Wishlist` table. All the data in the column will be lost.
  - You are about to drop the column `productNumber` on the `Wishlist` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `orderDate` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `productNumber` on the `Cart` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WishlistItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "albumCover" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "wishlistId" INTEGER NOT NULL,
    FOREIGN KEY ("wishlistId") REFERENCES "Wishlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WishlistItem" ("albumCover", "id", "name", "price", "wishlistId") SELECT "albumCover", "id", "name", "price", "wishlistId" FROM "WishlistItem";
DROP TABLE "WishlistItem";
ALTER TABLE "new_WishlistItem" RENAME TO "WishlistItem";
CREATE TABLE "new_Wishlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_Wishlist" ("id") SELECT "id" FROM "Wishlist";
DROP TABLE "Wishlist";
ALTER TABLE "new_Wishlist" RENAME TO "Wishlist";
CREATE TABLE "new_Cart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_Cart" ("id") SELECT "id" FROM "Cart";
DROP TABLE "Cart";
ALTER TABLE "new_Cart" RENAME TO "Cart";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
