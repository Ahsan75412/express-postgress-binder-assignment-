
import * as service from "./auth.service";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  const user = await service.signup(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
};

export const signin = async (req: Request, res: Response) => {
  const result = await service.signin(req.body.email, req.body.password);

  res.json({
    success: true,
    message: "Login successful",
    data: result,
  });
};
