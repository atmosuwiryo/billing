/*
  Warnings:

  - The `status` column on the `Langganan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Langganan" DROP COLUMN "status",
ADD COLUMN     "status" "StatusLangganan" NOT NULL DEFAULT 'AKTIF';
