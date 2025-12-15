import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config/intex";

// export interface AuthRequest extends Request {
//   user?: any;
// }

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, config.jwt_secret) as { id: number; role: string };
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};




