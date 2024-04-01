/*
  Warnings:

  - You are about to drop the column `password` on the `Student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentDocuments" DROP CONSTRAINT "StudentDocuments_studentId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "password";

-- CreateTable
CREATE TABLE "Authentication" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Authentication_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "RefreshTokens" (
    "username" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "RefreshTokens_pkey" PRIMARY KEY ("username")
);

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_username_key" ON "Authentication"("username");
