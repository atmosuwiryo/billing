/*
  Warnings:

  - The `status` column on the `Tagihan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusTagihan" AS ENUM ('AKTIF', 'TERBAYAR', 'MASA_TENGGANG', 'KADALUARSA');

-- AlterTable
ALTER TABLE "Tagihan" DROP COLUMN "status",
ADD COLUMN     "status" "StatusTagihan" NOT NULL DEFAULT 'AKTIF';
