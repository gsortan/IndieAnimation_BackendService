-- CreateTable
CREATE TABLE "Animation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "runtime" INTEGER NOT NULL,
    "episodeCount" INTEGER,
    "description" TEXT NOT NULL,
    "creatorName" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "platforms" TEXT[],

    CONSTRAINT "Animation_pkey" PRIMARY KEY ("id")
);
