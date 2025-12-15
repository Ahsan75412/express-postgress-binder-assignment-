// import * as service from "./user.service";
// import { Request, Response } from "express";

// export const getUsers = async (_req: Request, res: Response) => {
//   const users = await service.getUsers();
//   res.json(users);
// };

// export const updateUser = async (req: Request, res: Response) => {
//   const updated = await service.updateUser(req.params.id as string, req.body, req.user );
//   res.json(updated);
// };

// export const deleteUser = async (req: Request, res: Response) => {
//   await service.deleteUser(req.params.id as string);
//   res.json({ message: "User deleted" });
// };




import { AuthRequest } from "../../middlewares/auth";
import * as service from "./user.service";
import { Response } from "express";


export const getUsers = async (_req: AuthRequest, res: Response) => {
  const users = await service.getUsers();
  res.json(users);
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const updated = await service.updateUser(
    req.params.id as string,
    req.body,
    req.user
  );

  res.json(updated);
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  await service.deleteUser(req.params.id as string);
  res.json({ message: "User deleted" });
};
