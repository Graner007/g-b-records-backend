/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Record` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Record.name_unique" ON "Record"("name");
