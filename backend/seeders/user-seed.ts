// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-member-access
import { Prisma } from "@prisma/client";
type UsersData = Prisma.UserCreateInput;
const usersData: Array<UsersData> = [
  {
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
  {
    username: "user2",
    name: "User Two",
    email: "user2@gmail.com",
    bio: "Sample bio for User Two",
    website: "https://example.com",
    location: "Somewhere",
    verified: false,
    profile_picture_url: "https://example.com/user2.jpg",
    date_of_birth: new Date("1990-01-01"),
    tweets: {},
  },
];

module.exports = { usersData };
