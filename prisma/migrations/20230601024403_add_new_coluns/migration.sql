/*
  Warnings:

  - You are about to drop the column `birthDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- DropIndex
DROP INDEX "unique_id_email_username";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthDate",
DROP COLUMN "createAt",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "active" BOOLEAN,
ADD COLUMN     "attempt" INTEGER,
ADD COLUMN     "birth_date" TEXT,
ADD COLUMN     "blocked" BOOLEAN,
ADD COLUMN     "cellphone" TEXT,
ADD COLUMN     "code" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email_checked" BOOLEAN,
ADD COLUMN     "first_acess" BOOLEAN,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "url_img" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "unique_id_email_username" ON "User"("id", "email");
