import { Prisma, UserDetail } from "@prisma/client";
import prisma from "../../_lib/prisma";

export default async function updateDetails(
  userId: number,
  data: Partial<UserDetail>,
) {
  try {
    const userDetail = await prisma.userDetail.upsert({
      create: {
        userId: userId,
        ...data,
      },
      update: {
        userId: userId,
        ...data,
      },
      where: { userId: userId },
    });
    return userDetail;
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
