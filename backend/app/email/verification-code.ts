import prisma from "../../_lib/prisma";
const MINUTES = 10;
const generateCode = (length = 32) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  const code = Array<number>(length)
    .fill(0)
    .reduce(
      (prev) => prev + characters[Math.floor(Math.random() * charactersLength)],
      "",
    );
  return code;
};

const getExpirationDateTime = (minutes: number) => {
  const newDate = new Date();
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return newDate;
};

export const getVerificationCode = async (email: string) => {
  const code = generateCode();
  const expirationDate = getExpirationDateTime(MINUTES);
  const data = { email, code, expirationDate };
  const emailCode = await prisma.emailCodes.upsert({
    create: data,
    update: data,
    where: {
      email,
    },
  });

  return emailCode.code;
};
