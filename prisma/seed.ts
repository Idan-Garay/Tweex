/* eslint-disable */
// prisma only works with commonJS, use require instead of import
// needs more R&D for prisma seeding: CommonJS vs ESM
// const { usersData } = require("../backend/seeders/user-seed");
const { PrismaClient } = require("@prisma/client");

var prisma = new PrismaClient();
async function main() {
  await prisma.user.create({
    data: {
      username: "Alice",
      name: "User One",
      email: "alice@prisma.io",
      bio: "Sample bio for User One",
      website: "https://example.com",
      location: "Somewhere",
      verified: false,
      profile_picture_url: "https://example.com/user1.jpg",
      date_of_birth: new Date("1990-01-01"),
      tweets: {},
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
