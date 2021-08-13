-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" TEXT NOT NULL,
    "payment" INTEGER NOT NULL,
    "productNumber" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("address", "id", "orderDate", "payment", "productNumber", "userId") SELECT "address", "id", "orderDate", "payment", "productNumber", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order.userId_unique" ON "Order"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
