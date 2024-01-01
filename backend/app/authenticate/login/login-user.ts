import prisma from "../../../_lib/prisma";

export default async function loginUser(data: {
  email?: string;
  username: string;
}) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
        username: data.username,
      }, 
    });
    if (user) {
      const { username, email } = user;
      return { username, email };
    }
    return user;
  } catch (e) {
    console.log(e);
  }

  return null;
}
