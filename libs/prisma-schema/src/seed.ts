import { PrismaClient } from '@prisma/client';
import { seedUser } from './seeds/user.seed';
import { seedPaket } from './seeds/packet.seed';
const prisma = new PrismaClient();


async function main () {

  const pakets = await seedPaket();
  console.log('seeding paket dan produk', JSON.stringify(pakets, null, 2));
  const users = await seedUser(pakets);
  console.log('seeding user, profile, langganan, dan tagihan', JSON.stringify(users, null, 2));

}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
