-- CreateEnum
CREATE TYPE "JenisDiskon" AS ENUM ('PERSENTASE', 'NOMINAL');

-- CreateEnum
CREATE TYPE "SatuanWaktuDiskon" AS ENUM ('HARI', 'BULAN', 'TAHUN');

-- CreateEnum
CREATE TYPE "StatusLangganan" AS ENUM ('AKTIF', 'TIDAK_AKTIF', 'ISOLIR', 'DISMANTLE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "namaPelanggan" TEXT NOT NULL,
    "noNIK" TEXT NOT NULL,
    "noRegistrasi" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "noWA" TEXT NOT NULL,
    "paket" TEXT NOT NULL,
    "tglAktif" TIMESTAMP(3) NOT NULL,
    "tglExp" TIMESTAMP(3) NOT NULL,
    "payment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paket" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "kecepatan" TEXT NOT NULL,
    "harga" DECIMAL(18,2) NOT NULL,
    "isLangganan" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Paket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produk" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "diskon" INTEGER NOT NULL DEFAULT 0,
    "jenisDiskon" "JenisDiskon" NOT NULL DEFAULT 'NOMINAL',
    "lamaWaktuDiskon" INTEGER NOT NULL DEFAULT 0,
    "satuanWaktuDiskon" "SatuanWaktuDiskon" NOT NULL DEFAULT 'TAHUN',
    "tglMulaiDiskon" TIMESTAMP(3),
    "tglSelesaiDiskon" TIMESTAMP(3),
    "paketId" TEXT NOT NULL,

    CONSTRAINT "Produk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Langganan" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "produkId" TEXT NOT NULL,
    "tglMulai" TIMESTAMP(3) NOT NULL,
    "tglSelesai" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Langganan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tagihan" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "langgananId" TEXT NOT NULL,
    "tglMulai" TIMESTAMP(3) NOT NULL,
    "tglSelesai" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Tagihan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_noNIK_key" ON "Profile"("noNIK");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_noRegistrasi_key" ON "Profile"("noRegistrasi");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produk" ADD CONSTRAINT "Produk_paketId_fkey" FOREIGN KEY ("paketId") REFERENCES "Paket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Langganan" ADD CONSTRAINT "Langganan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Langganan" ADD CONSTRAINT "Langganan_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tagihan" ADD CONSTRAINT "Tagihan_langgananId_fkey" FOREIGN KEY ("langgananId") REFERENCES "Langganan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
