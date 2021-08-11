/*
  Warnings:

  - You are about to drop the `WishlistItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "WishlistItem";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_RecordToWishlist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Record" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Wishlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_RecordToWishlist_AB_unique" ON "_RecordToWishlist"("A", "B");

-- CreateIndex
CREATE INDEX "_RecordToWishlist_B_index" ON "_RecordToWishlist"("B");
