-- CreateEnum
CREATE TYPE "Badge" AS ENUM ('Diamond', 'Gold', 'Silver', 'Platinum');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "badges" "Badge" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questionaire" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Questionaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slides" (
    "id" TEXT NOT NULL,
    "ask" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "Slides_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Questionaire" ADD CONSTRAINT "Questionaire_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slides" ADD CONSTRAINT "Slides_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questionaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
