// import * as service from "./auth.service";

// export const signup = async (req: any, res: any) => {
//   const user = await service.signup(req.body);
//   res.status(201).json(user);
// };

// export const signin = async (req: any, res: any) => {
//   const token = await service.signin(req.body.email, req.body.password);
//   res.json(token);
// };


// export const logout = async (req: any, res: any) => {
//   res.status(200).json({ message: "Logged out successfully" });
// };



// import * as service from "./auth.service";
// import { Request, Response } from "express";

// export const signup = async (req: Request, res: Response) => {
//   const user = await service.signup(req.body);
//   res.status(201).json(user);
// };

// export const signin = async (req: Request, res: Response) => {
//   const token = await service.signin(req.body.email, req.body.password);
//   res.json(token);
// };


// import * as service from "./auth.service";
// import { Request, Response } from "express";

// export const signup = async (req: Request, res: Response) => {
//   const user = await service.signup(req.body);
  
//   res.status(201).json({
//     success: true,
//     message: "User registered successfully",
//     data: user,
//   });
// };

// export const signin = async (req: Request, res: Response) => {
//   const result = await service.signin(req.body.email, req.body.password);

//   res.json({
//     success: true,
//     message: "Login successful",
//     data: result,
//   });
// };



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
