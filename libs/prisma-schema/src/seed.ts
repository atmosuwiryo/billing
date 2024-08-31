import { PrismaClient, Profile, User } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/id_ID';
const prisma = new PrismaClient();

async function main () {
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

    console.log(`Creating ${i} user: ${firstName} ${lastName}`)
    await prisma.user.create({
      data: data,
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
