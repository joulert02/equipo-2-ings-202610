-- AlterTable
ALTER TABLE "Favor" ADD COLUMN     "executorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Favor" ADD CONSTRAINT "Favor_executorId_fkey" FOREIGN KEY ("executorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
