import { Request, Response, NextFunction } from "express";
import { verifedToken } from "../utils/jwt.utils";

export const authenticationChecking = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ error: "No token is provided or format is invalided" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const varifiedUser = verifedToken(token);

  if (!varifiedUser) {
    res.status(401).json({ error: "token is Invalided or expired " });
    return;
  }

  req.user = varifiedUser;
  next();
};
