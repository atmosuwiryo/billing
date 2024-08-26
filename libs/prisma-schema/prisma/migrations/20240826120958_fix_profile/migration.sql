/*
  Warnings:

  - You are about to drop the column `paket` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "paket",
DROP COLUMN "payment",
ALTER COLUMN "tglExp" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tagihan" ALTER COLUMN "tglPembayaran" DROP NOT NULL;
