-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "releaseDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "albumCover" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "leftInStock" INTEGER NOT NULL DEFAULT 10,
    "artistId" INTEGER NOT NULL,
    FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Record" ("albumCover", "artistId", "description", "id", "name", "price", "releaseDate") SELECT "albumCover", "artistId", "description", "id", "name", "price", "releaseDate" FROM "Record";
DROP TABLE "Record";
ALTER TABLE "new_Record" RENAME TO "Record";
CREATE UNIQUE INDEX "Record.name_unique" ON "Record"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
