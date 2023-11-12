import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import hashPassword from "./utilities/hashPassword.ts";

const seedUserAndUserDetail = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
) => {
  const user1 = await prisma.user.create({
    data: {
      username: "katarinayu",
      email: "katarinayu789@gmail.com",
      password: await hashPassword("P@ssw0rd"),
      isEmailVerified: false,
    },
  });

  await prisma.userDetail.create({
    data: {
      userId: user1.id,
      firstName: "Katarina",
      lastName: "Yu",
      bio: "Hello, World!",
      phoneNumber: "+639123456789",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "kimminjeong",
      email: "kimminjeong@gmail.com",
      password: await hashPassword("P@ssw0rd"),
      isEmailVerified: true,
    },
  });

  await prisma.userDetail.create({
    data: {
      userId: user2.id,
      firstName: "Minjeong",
      lastName: "Kim",
      bio: "Hello, MY World!",
      phoneNumber: "+639123456789",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      username: "velvetcrowe",
      email: "velvetcrowe@gmail.com",
      password: await hashPassword("P@ssw0rd"),
      isEmailVerified: true,
    },
  });

  await prisma.userDetail.create({
    data: {
      userId: user3.id,
      firstName: "Velvet",
      lastName: "Crowe",
      bio: "Hello, Midgand!",
      phoneNumber: "+639123456789",
    },
  });
};

export default seedUserAndUserDetail;
