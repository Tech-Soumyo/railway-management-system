import { Request, Response, NextFunction } from "express";
import { config } from "../config/env.config";

export const restrictToAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const AdminapiKey = req.headers["x-api-key"];
  if (!AdminapiKey || AdminapiKey !== config.adminApiKey) {
    res
      .status(403)
      .json({ error: "Forbidden: API key is Invalided or missing" });
    return;
  }
  next();
};
