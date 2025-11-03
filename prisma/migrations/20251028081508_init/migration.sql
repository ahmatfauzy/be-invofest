-- CreateEnum
CREATE TYPE "CompetitionType" AS ENUM ('POSTER', 'UIUX', 'WEB');

-- CreateEnum
CREATE TYPE "ParticipantType" AS ENUM ('INDIVIDU', 'TEAM');

-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('SMA', 'MAHASISWA');

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionRegistration" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "competition" "CompetitionType" NOT NULL,
    "participantType" "ParticipantType" NOT NULL,
    "degree" "Degree" NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT,
    "teamName" TEXT,
    "school" TEXT NOT NULL,
    "leaderName" TEXT,
    "memberCardUrl" TEXT NOT NULL,
    "paymentUrl" TEXT NOT NULL,
    "igFollowUrl" TEXT NOT NULL,

    CONSTRAINT "CompetitionRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
