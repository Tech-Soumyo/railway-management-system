import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userData = await registerUser(email, password);
    res
      .status(201)
      .json({ message: "You are successfully SignedUp", userData });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    res.json({ message: "You are successfully LoggedIn", token, user });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
