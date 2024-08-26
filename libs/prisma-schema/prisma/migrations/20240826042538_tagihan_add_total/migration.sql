/*
  Warnings:

  - Added the required column `tglPembayaran` to the `Tagihan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tagihan" ADD COLUMN     "diskon" DECIMAL(18,2) NOT NULL DEFAULT 0,
ADD COLUMN     "nominal" DECIMAL(18,2) NOT NULL DEFAULT 0,
ADD COLUMN     "pajak" DECIMAL(18,2) NOT NULL DEFAULT 0,
ADD COLUMN     "tglPembayaran" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "total" DECIMAL(18,2) NOT NULL DEFAULT 0;
