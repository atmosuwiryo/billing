import { Langganan, Paket, PrismaClient, Produk, Profile, StatusLangganan, StatusTagihan, Tagihan, User } from "@prisma/client";
import { faker } from '@faker-js/faker/locale/id_ID';
import { Decimal, Omit } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export const seedUser = async (paket: (Paket & { produks: Produk[] })[]): Promise<User[]> => {

  const results: User[] = [];
  for (let i = 0; i < 10; i++) {

    const firstName = faker.person.firstName();
    const lastName = 'seed';

    // User data
    const user: Omit<User, 'id' | 'createdAt' | 'updatedAt'> = {
      username: faker.internet.userName({ firstName, lastName }),
      email: faker.internet.email({firstName, lastName}),
      password: 'Johndoe@1234',
      isAdmin: false,
    }

    // Profile data
    const profile: Omit<Profile, 'id' | 'createdAt' | 'updatedAt' | 'userId'> = {
      namaPelanggan: faker.internet.displayName({ firstName, lastName }),
      noNIK: faker.string.numeric(16),
      noRegistrasi: 'CN' + faker.string.numeric(6), // 16 digit.
      alamat: faker.location.streetAddress(),
      noWA: faker.phone.number(),
      tglAktif: faker.date.recent(),
      tglExp: faker.date.future()
    }

    // Langganan data
    const randomPaket = faker.helpers.arrayElement(paket);
    const randomProduk = faker.helpers.arrayElement(randomPaket.produks);
    const produkId = randomProduk.id;
    const statusLangganan = faker.helpers.enumValue(StatusLangganan);
    let tglMulai = faker.date.recent();
    let tglSelesai = faker.date.future();
    if (statusLangganan === StatusLangganan.TIDAK_AKTIF) {
      tglMulai = faker.date.past();
      tglSelesai = faker.date.recent();
    }

    const langganan: Omit<Langganan, 'id' | 'createdAt' | 'updatedAt' | 'userId'> = {
      produkId: produkId,
      tglMulai: tglMulai,
      tglSelesai: tglSelesai,
      status: faker.helpers.enumValue(StatusLangganan)
    }

    // Tagihan data
    const nominal = randomPaket.harga;
    const diskon = randomProduk.diskon;
    const total = nominal.toNumber() - diskon.toNumber();
    let tglPembayaran: Date | null = faker.date.past();
    let statusTagihan: StatusTagihan = StatusTagihan.KADALUARSA;
    if (statusLangganan === StatusLangganan.AKTIF) {
      tglPembayaran = faker.helpers.arrayElement([faker.date.recent(), null]);
      if (!tglPembayaran) {
        statusTagihan = StatusTagihan.AKTIF;
      } else {
        statusTagihan = StatusTagihan.TERBAYAR;
      }
    }

    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const tagihan: Omit<Tagihan, 'id' | 'createdAt' | 'updatedAt' | 'langgananId'> = {
      nominal: nominal,
      diskon: diskon,
      pajak: new Decimal(0),
      total: new Decimal(total),
      tglPembayaran: tglPembayaran,
      tglMulai: firstDay,
      tglSelesai: lastDay,
      status: statusTagihan
    }

    // Construct all data
    const langgananData = {
      ...langganan,
      tagihan: {
        create: tagihan
      }
    }

    const data = {
      ...user,
      profile: {
        create: profile
      },
      langganan: {
        create: langgananData,
      }
    }

    // Create user, profile, langganan and tagihan
    const result = await prisma.user.create({
      data: data,
      include: {
        profile: true,
        langganan: {
          include: {
            tagihan: true
          }
        }
      }
    });

    results.push(result);

  }

  return results

}
