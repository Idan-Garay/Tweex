import { PrismaClient, Prisma, $Enums } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

const seedTweet = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
) => {
  /**
   *  This function may throw a ForeignKey error
   *  on the `authorId` field. Make sure that the
   *  user with that id exists.
   *
   *  Running, `npx prisma migrate reset` will
   *  reset the state of the database and automatically
   *  run `prisma db seed` which then calls this function,
   *  provided that it's invoked in the prisma/seed.ts
   *
   */
  await prisma.tweet.create({
    data: {
      text: "Stream DRAMA.",
      audience: $Enums.Audience.PUBLIC,
      authorId: 1,
      comments: {
        createMany: {
          data: [
            {
              userId: 3,
              text: "Wow, I love DRAMA.",
            },
            {
              userId: 2,
              text: "OK. I will stream DRAMA.",
            },
          ],
        },
      },
    },
  });

  await prisma.tweet.create({
    data: {
      text: "Welcome to MY World!",
      audience: $Enums.Audience.PUBLIC,
      authorId: 1,
      comments: {
        createMany: {
          data: [
            {
              userId: 2,
              text: "Kkkkk. What do you mean?",
            },
            {
              userId: 3,
              text: "Tnx. :)",
            },
          ],
        },
      },
    },
  });

  await prisma.tweet.create({
    data: {
      text: "Don't you know I'm a savage? kkkk",
      audience: $Enums.Audience.PUBLIC,
      authorId: 1,
      comments: {
        createMany: {
          data: [
            {
              userId: 2,
              text: "Kkkkk. No.",
            },
          ],
        },
      },
    },
  });

  await prisma.tweet.create({
    data: {
      text: "Hello, MY Real World!",
      audience: $Enums.Audience.PUBLIC,
      authorId: 2,
      comments: {
        createMany: {
          data: [
            {
              userId: 1,
              text: "What?",
            },
            {
              userId: 2,
              text: "Where is that?",
            },
          ],
        },
      },
    },
  });

  await prisma.tweet.create({
    data: {
      text: "BAAAAAAAAAAAM!",
      audience: $Enums.Audience.PUBLIC,
      authorId: 2,
      comments: {
        createMany: {
          data: [
            {
              userId: 2,
              text: "Oh no...",
            },
            {
              userId: 1,
              text: "I'm dead.",
            },
          ],
        },
      },
    },
  });

  await prisma.tweet.create({
    data: {
      text: "I'm the DRAMA...",
      audience: $Enums.Audience.PUBLIC,
      authorId: 3,
      comments: {
        createMany: {
          data: [
            {
              userId: 2,
              text: "Oh, yes you are, dear!",
            },
            {
              userId: 1,
              text: "N-O W-A-Y!",
            },
          ],
        },
      },
    },
  });
};

export default seedTweet;
