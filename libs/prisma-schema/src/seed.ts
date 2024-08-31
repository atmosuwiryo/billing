import { JenisDiskon, Paket, PrismaClient, Profile, SatuanWaktuDiskon, User } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/id_ID';
const prisma = new PrismaClient();

async function seedUser(): Promise<User[]> {

  const results: User[] = [];
  for (let i = 0; i < 10; i++) {

    const firstName = faker.person.firstName();
    const lastName = 'seed';

    const user: Omit<User, 'id' | 'createdAt' | 'updatedAt'> = {
      username: faker.internet.userName({ firstName, lastName }),
      email: faker.internet.email({firstName, lastName}),
      password: 'Johndoe@1234',
      isAdmin: false,
    }

    const profile: Omit<Profile, 'id' | 'createdAt' | 'updatedAt' | 'userId'> = {
      namaPelanggan: faker.internet.displayName({ firstName, lastName }),
      noNIK: faker.string.numeric(16),
      noRegistrasi: 'CN' + faker.string.numeric(6), // 16 digit.
      alamat: faker.location.streetAddress(),
      noWA: faker.phone.number(),
      tglAktif: faker.date.recent(),
      tglExp: faker.date.future()

    }

    const data = {
      ...user,
      profile: {
        create: profile
      }
    }

    const result = await prisma.user.create({
      data: data,
    });

    results.push(result);

  }

  return results

}

async function seedPaket(): Promise<Paket[]> {

  const results: Paket[] = [];

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

async function main () {

  const pakets = await seedPaket();
  console.log('seeding paket', pakets);
  const users = await seedUser();
  console.log('seeding user', users);

}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
