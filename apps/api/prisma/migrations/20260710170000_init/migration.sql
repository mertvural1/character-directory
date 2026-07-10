-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Character_status_idx" ON "Character"("status");

-- CreateIndex
CREATE INDEX "Character_gender_idx" ON "Character"("gender");

-- CreateIndex
CREATE INDEX "Character_name_idx" ON "Character"("name");

