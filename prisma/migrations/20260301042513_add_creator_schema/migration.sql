-- CreateTable
CREATE TABLE "Creator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnimationToCreator" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AnimationToCreator_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AnimationToCreator_B_index" ON "_AnimationToCreator"("B");

-- AddForeignKey
ALTER TABLE "_AnimationToCreator" ADD CONSTRAINT "_AnimationToCreator_A_fkey" FOREIGN KEY ("A") REFERENCES "Animation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimationToCreator" ADD CONSTRAINT "_AnimationToCreator_B_fkey" FOREIGN KEY ("B") REFERENCES "Creator"("id") ON DELETE CASCADE ON UPDATE CASCADE;
