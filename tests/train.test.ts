import prisma from "../src/config/database.config";
import { config } from "../src/config/env.config";

console.log(config);

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
    const users = await prisma.user.findMany();
    console.log("Users:", users);
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
