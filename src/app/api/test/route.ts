import { PrismaClient, User } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const getTweets = async () => {
  const tweets = await prisma.tweet.findMany({
    where: {
      author: {
        userDetail: {
          is: {
            firstName: "Katarina",
          },
        },
      },
    },
  });
  return tweets;
};

const getUser = async (
  username: string,
  password: string,
): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  if (!user) return null;
  const typedUser = user;
  const isPasswordValid = await bcrypt.compare(password, typedUser.password);
  return isPasswordValid ? user : null;
};

export async function GET() {
  const users = await getUsers();
  const tweets = await getTweets();
  const user = await getUser("katarinayu", "P@ssw0rd");

  let response;
  if (user) response = { users, tweets, user };
  else response = { users, tweets, user: {} };
  console.log(response);
  return NextResponse.json(response);
}
