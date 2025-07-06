import bcrypt from "bcrypt";
import prisma from "../config/database.config";
import { generatedToken } from "../utils/jwt.utils";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("The Format of Email is Invalid"),
  password: z.string().min(6, "Password must be at least with 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("The Format of Email is Invalid"),
  password: z.string(),
});

export const registerUser = async (email: string, password: string) => {
  registerSchema.parse({ email, password });
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "USER",
    },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return userData;
};

export const loginUser = async (email: string, password: string) => {
  loginSchema.parse({ email, password });

  const userData = await prisma.user.findUnique({ where: { email } });
  if (!userData) {
    throw new Error("The credentials are Invalid");
  }

  const isPasswordValid = await bcrypt.compare(password, userData.password);
  if (!isPasswordValid) {
    throw new Error("The credentials are Invalid");
  }

  const token = generatedToken({
    id: userData.id,
    role: userData.role,
    email: userData.email,
  });
  return {
    token,
    user: { id: userData.id, email: userData.email, role: userData.role },
  };
};
