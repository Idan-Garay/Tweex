import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
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

const getUser = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  if (!user) return null;
  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid ? user : null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  const users = await getUsers();
  const tweets = await getTweets();
  const user = await getUser("katarinayu", "P@ssw0rd");

  let response;
  if (user) response = { users, tweets, user };
  else response = { users, tweets, user: {} };
  console.log(response);
  return NextResponse.json(response);
}
