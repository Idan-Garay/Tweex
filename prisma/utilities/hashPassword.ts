import bcrypt from "bcrypt";

const hashPassword = async (password: string | Buffer): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export default hashPassword;
