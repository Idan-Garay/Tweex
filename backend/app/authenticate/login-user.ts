import prisma from "../../_lib/prisma";

export default async function loginUser(data: {
  email: string;
  username: string;
}) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
      username: data.username,
    },
  });
  console.log("user", user);
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
