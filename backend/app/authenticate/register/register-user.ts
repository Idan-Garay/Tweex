import { Prisma } from "@prisma/client";
import prisma from "../../../_lib/prisma";
import hashPassword from "prisma/utilities/hashPassword";

export default async function registerUser(data: {
  username?: string;
  email?: string;
  password?: string;
  birthDate?: Date;
  isEmailVerified?: boolean;
}) {
  const { username, email, password, birthDate,isEmailVerified } = data;

  const encryptedPassword = await hashPassword(password ?? "");
  try {
    const user = await prisma.user.create({
      data: {
        email: email ?? "",
        username: username ?? "",
        password: encryptedPassword,
        isEmailVerified: isEmailVerified ?? false,
        userDetail: {
          create: { birthdate: birthDate },
        },
      },
    });
    return user;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email",
        );
      }
    }
  }
  return null;
}
