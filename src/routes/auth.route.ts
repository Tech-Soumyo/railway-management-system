import { Router, Request, Response } from "express";
import { signIn, signUp } from "../controllers/auth.controller";
import { authenticationChecking } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", signUp);
router.post("/login", signIn);
router.get(
  "/protected",
  authenticationChecking,
  (req: Request, res: Response) => {
    res.json({ message: "Protected route accessed", user: req.user });
  }
);
export default router;
