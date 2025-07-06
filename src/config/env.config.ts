import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET", "ADMIN_API_KEY"];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  adminApiKey: process.env.ADMIN_API_KEY,
};
