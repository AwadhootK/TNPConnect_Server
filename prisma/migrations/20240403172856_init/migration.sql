-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('online', 'offline');

-- CreateEnum
CREATE TYPE "Branch" AS ENUM ('CSE', 'IT', 'ENTC');

-- CreateEnum
CREATE TYPE "Year" AS ENUM ('FE', 'SE', 'TE', 'BE');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "Student" (
    "enrollmentNo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rollNo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "prnNo" TEXT NOT NULL,
    "branch" "Branch" NOT NULL,
    "cgpa" DOUBLE PRECISION NOT NULL,
    "year" "Year" NOT NULL,
    "countOfBacklogs" INTEGER NOT NULL DEFAULT 0,
    "isInterned" BOOLEAN NOT NULL DEFAULT false,
    "gender" "Gender" NOT NULL,
    "companyName" TEXT NOT NULL DEFAULT 'NA',
    "registeredCompanies" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Student_pkey" PRIMARY KEY ("enrollmentNo")
);

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

-- CreateTable
CREATE TABLE "StudentDocuments" (
    "studentId" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "tenthMarksheet" TEXT NOT NULL,
    "twelfthMarksheet" TEXT NOT NULL,
    "transcript" TEXT NOT NULL,
    "collegeID" TEXT NOT NULL,
    "aadharCard" TEXT NOT NULL,
    "panCard" TEXT NOT NULL,
    "passport" TEXT,
    "amcatPaymentReceipt" TEXT NOT NULL,
    "amcatResult" TEXT NOT NULL,
    "TEfeeReceipt" TEXT,

    CONSTRAINT "StudentDocuments_pkey" PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stipend" INTEGER NOT NULL DEFAULT 0,
    "ppo" BOOLEAN,
    "jdLink" TEXT,
    "location" TEXT,
    "duration" INTEGER,
    "rounds" INTEGER,
    "dateTimeOfTest" TIMESTAMP(3),
    "notes" TEXT,
    "criteria" TEXT,
    "eligibleBranches" "Branch"[] DEFAULT ARRAY['CSE', 'IT', 'ENTC']::"Branch"[],
    "mode" "Mode",
    "driveCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_enrollmentNo_key" ON "Student"("enrollmentNo");

-- CreateIndex
CREATE UNIQUE INDEX "Student_rollNo_key" ON "Student"("rollNo");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_prnNo_key" ON "Student"("prnNo");

-- CreateIndex
CREATE INDEX "Student_name_enrollmentNo_idx" ON "Student"("name", "enrollmentNo");

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_username_key" ON "Authentication"("username");
