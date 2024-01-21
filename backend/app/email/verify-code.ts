import prisma from "../../_lib/prisma";

export const verifyCode = async (email = "", code = "") => {
  const result = {
    status: true,
    message: "Email verified",
  };
  try {
    const emailCode = await prisma.emailCodes.findUnique({
      where: {
        email,
      },
    });
    if (emailCode) {
      const today = new Date();
      if (today > emailCode.expirationDate) {
        result.status = false;
        result.message = "Verification Code is expired.";
      } else if (emailCode.code !== code) {
        result.status = false;
        result.message = "Invalid verification code.";
      } else {
        await prisma.user.update({
          where: { email },
          data: {
            isEmailVerified: true,
          },
        });
      }
    }
  } catch (e) {
    result.status = false;
    result.message = "Something went wrong accessing backend";
  }

  return result;
};
