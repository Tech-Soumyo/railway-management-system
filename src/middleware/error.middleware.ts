import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.utils";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error for debugging
  logger.error(
    `Error: ${err.message}, Stack: ${err.stack}, Path: ${req.path}, Method: ${req.method}`
  );

  // Handle Prisma-specific errors
  if (err.name === "PrismaClientKnownRequestError") {
    switch (err.code) {
      case "P2002": // Unique constraint violation
        res.status(400).json({ error: "Duplicate entry detected" });
        return;
      case "P2025": // Record not found
        res.status(404).json({ error: "Resource not found" });
        return;
      default:
        res.status(500).json({ error: "Database error occurred" });
        return;
    }
  }

  // Handle other known errors
  if (
    err.message.includes("No seats available") ||
    err.message.includes("Train not found") ||
    err.message.includes("Booking not found") ||
    err.message.includes("Unauthorized") ||
    err.message.includes("Invalid or missing API key") ||
    err.message.includes("Invalid token")
  ) {
    res.status(err.statusCode || 400).json({ error: err.message });
    return;
  }

  // Default to generic error for unhandled cases
  res.status(500).json({ error: "Internal server error" });
};
