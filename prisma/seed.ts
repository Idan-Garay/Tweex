import { PrismaClient } from "@prisma/client";
import seedUserAndUserDetail from "./userSeed.ts";
import seedTweet from "./tweetSeed.ts";

const prisma = new PrismaClient();

async function main() {
  await seedUserAndUserDetail(prisma);
  await seedTweet(prisma);
}

main()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
