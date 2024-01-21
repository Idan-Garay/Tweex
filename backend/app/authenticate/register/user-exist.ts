import prisma from "../../../_lib/prisma";

export default async function userExist(username:string, email: string) {
  const user = await prisma.user.findFirst({
    where: {
        OR: [
            {email},
            {username}
        ]
    },
  });
  return user;
}