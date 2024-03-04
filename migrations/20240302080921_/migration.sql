-- CreateEnum
CREATE TYPE "HealthState" AS ENUM ('UP', 'DOWN', 'MAINTENANCE');

-- CreateTable
CREATE TABLE "Health" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "codename" TEXT NOT NULL,
    "description" TEXT,
    "state" "HealthState" NOT NULL,

    CONSTRAINT "Health_pkey" PRIMARY KEY ("id")
);
