import { JenisDiskon, Paket, PrismaClient, Produk, SatuanWaktuDiskon } from "@prisma/client";

const prisma = new PrismaClient();

export const seedPaket = async (): Promise<(Paket & { produks: Produk[] })[]> => {

  const results: (Paket & { produks: Produk[] })[] = [];

  const pakets = [
    {
      kecepatan: '5mbps',
      harga: 150000,
      isLangganan: true,
      isActive: true,
      produks: {
        createMany: {
          data: [
            {
              nama: 'basic 5mbps',
              diskon: 0,
              jenisDiskon: JenisDiskon.NOMINAL,
              lamaWaktuDiskon: 0,
              satuanWaktuDiskon: SatuanWaktuDiskon.TAHUN,
              tglMulaiDiskon: null,
              tglSelesaiDiskon: null
            },
            {
              nama: 'basic 5mbps merdeka',
              diskon: 50000,
              jenisDiskon: JenisDiskon.NOMINAL,
              lamaWaktuDiskon: 1,
              satuanWaktuDiskon: SatuanWaktuDiskon.TAHUN,
              tglMulaiDiskon: new Date('2024-08-01T00:00:00.000Z'),
              tglSelesaiDiskon: new Date('2024-08-31T00:00:00.000Z')
            }
          ]
        }
      }
    }, {
      kecepatan: '10mbps',
      harga: 185000,
      isLangganan: true,
      isActive: true,
      produks: {
        createMany: {
          data: [
            {
              nama: 'basic 10mbps',
              diskon: 0,
              jenisDiskon: JenisDiskon.NOMINAL,
              lamaWaktuDiskon: 0,
              satuanWaktuDiskon: SatuanWaktuDiskon.TAHUN,
              tglMulaiDiskon: null,
              tglSelesaiDiskon: null
            },
            {
              nama: 'basic 10mbps merdeka',
              diskon: 50000,
              jenisDiskon: JenisDiskon.NOMINAL,
              lamaWaktuDiskon: 1,
              satuanWaktuDiskon: SatuanWaktuDiskon.TAHUN,
              tglMulaiDiskon: new Date('2024-08-01T00:00:00.000Z'),
              tglSelesaiDiskon: new Date('2024-08-31T00:00:00.000Z')
            }
          ]
        }
      }
    }, {
      kecepatan: '20mbps',
      harga: 250000,
      isLangganan: true,
      isActive: true,
      produks: {
        createMany: {
          data: [
            {
              nama: 'basic 20mbps',
              diskon: 0,
              jenisDiskon: JenisDiskon.NOMINAL,
              lamaWaktuDiskon: 0,
              satuanWaktuDiskon: SatuanWaktuDiskon.TAHUN,
              tglMulaiDiskon: null,
              tglSelesaiDiskon: null
            },
            {
              nama: 'basic 20mbps merdeka',
              diskon: 50000,
              jenisDiskon: JenisDiskon.NOMINAL,
              lamaWaktuDiskon: 1,
              satuanWaktuDiskon: SatuanWaktuDiskon.TAHUN,
              tglMulaiDiskon: new Date('2024-08-01T00:00:00.000Z'),
              tglSelesaiDiskon: new Date('2024-08-31T00:00:00.000Z')
            }
          ]
        }
      }
    }, {
      kecepatan: '50mbps',
      harga: 650000,
      isLangganan: true,
      isActive: true,
      produks: {
        createMany: {
          data: [
            {
              nama: 'basic 50mbps',
              diskon: 0,
              jenisDiskon: JenisDiskon.NOMINAL,
              lamaWaktuDiskon: 0,
              satuanWaktuDiskon: SatuanWaktuDiskon.TAHUN,
              tglMulaiDiskon: null,
              tglSelesaiDiskon: null
            },
            {
              nama: 'basic 50mbps merdeka',
              diskon: 50000,
              jenisDiskon: JenisDiskon.NOMINAL,
              lamaWaktuDiskon: 1,
              satuanWaktuDiskon: SatuanWaktuDiskon.TAHUN,
              tglMulaiDiskon: new Date('2024-08-01T00:00:00.000Z'),
              tglSelesaiDiskon: new Date('2024-08-31T00:00:00.000Z')
            }
          ]
        }
      }
    }, {
      kecepatan: '100mbps',
      harga: 1100000,
      isLangganan: true,
      isActive: true,
      produks: {
        createMany: {
          data: [
            {
              nama: 'basic 100mbps',
              diskon: 0,
              jenisDiskon: JenisDiskon.NOMINAL,
              lamaWaktuDiskon: 0,
              satuanWaktuDiskon: SatuanWaktuDiskon.TAHUN,
              tglMulaiDiskon: null,
              tglSelesaiDiskon: null
            },
            {
              nama: 'basic 100mbps merdeka',
              diskon: 50000,
              jenisDiskon: JenisDiskon.NOMINAL,
              lamaWaktuDiskon: 1,
              satuanWaktuDiskon: SatuanWaktuDiskon.TAHUN,
              tglMulaiDiskon: new Date('2024-08-01T00:00:00.000Z'),
              tglSelesaiDiskon: new Date('2024-08-31T00:00:00.000Z')
            }
          ]
        }
      }
    }, {
      kecepatan: '150mbps',
      harga: 1500000,
      isLangganan: true,
      isActive: false,
      produks: {
        createMany: {
          data: [
            {
              nama: 'basic 150mbps',
              diskon: 0,
              jenisDiskon: JenisDiskon.NOMINAL,
              lamaWaktuDiskon: 0,
              satuanWaktuDiskon: SatuanWaktuDiskon.TAHUN,
              tglMulaiDiskon: null,
              tglSelesaiDiskon: null
            },
            {
              nama: 'basic 150mbps merdeka',
              diskon: 50000,
              jenisDiskon: JenisDiskon.NOMINAL,
              lamaWaktuDiskon: 1,
              satuanWaktuDiskon: SatuanWaktuDiskon.TAHUN,
              tglMulaiDiskon: new Date('2024-08-01T00:00:00.000Z'),
              tglSelesaiDiskon: new Date('2024-08-31T00:00:00.000Z')
            }
          ]
        }
      }
    }
  ]

  for (const paket of pakets) {
    const result = await prisma.paket.create({
      data: paket,
      include: {
        produks: true
      }
    });

    results.push(result);
  }

  return results;

}
