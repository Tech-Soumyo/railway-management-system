import jwt from "jsonwebtoken";
import { config } from "../config/env";

export const generateToken = (payload: { id: number; role: string }) => {
  return jwt.sign(payload, config.jwtSecret!, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, config.jwtSecret!) as { id: number; role: string };
  } catch {
    return null;
  }
};
