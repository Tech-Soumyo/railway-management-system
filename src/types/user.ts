export interface User {
  id: number;
  email: string;
  role: "user" | "admin";
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
