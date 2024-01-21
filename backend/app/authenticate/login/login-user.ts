import prisma from "../../../_lib/prisma";

export default async function loginUser(data: {
  email?: string;
  username: string;
}) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: data.email,
          },
          {
            username: data.username,
          },
        ],
      },
    });

    if (user) {
      const {id, username, email, isEmailVerified } = user;
      return {id, username, email, isEmailVerified };
    }
    return user;
  } catch (e) {
    console.log(e);
  }

  return null;
}
