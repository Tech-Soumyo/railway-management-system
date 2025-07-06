import jwt from "jsonwebtoken";
import { config } from "../config/env.config";

export const generatedToken = (payload: {
  id: number;
  role: string;
  email: string;
}) => {
  return jwt.sign(payload, config.jwtSecret!, { expiresIn: "1h" });
};

export const verifedToken = (token: string) => {
  try {
    const payloadData = jwt.verify(token, config.jwtSecret!) as {
      id: number;
      email: string;
      role: string;
    };
    return {
      id: payloadData.id,
      email: payloadData.email,
      role: payloadData.role as "user" | "admin",
    };
  } catch {
    return null;
  }
};
