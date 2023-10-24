import prisma from "../../_lib/prisma";

export default async function loginUser(data: { email: string; name: string }) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
      name: data.name,
    },
  });

  if (!user) {
    return {
      error: {
        status: 404,
        message: "User not found",
      },
    };
  }
  return { user };
}
