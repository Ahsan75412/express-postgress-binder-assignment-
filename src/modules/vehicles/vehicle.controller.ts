import * as service from "./vehicle.service";
import { Request, Response } from "express";

export const createVehicle = async (req: Request, res: Response) => {
  const vehicle = await service.createVehicle(req.body);
  res.status(201).json(vehicle);
};

export const getVehicles = async (_req: Request, res: Response) => {
  const vehicles = await service.getVehicles();
  res.json(vehicles);
};

export const getVehicle = async (req: Request, res: Response) => {
  const vehicle = await service.getVehicle(req.params.id as string);
  res.json(vehicle);
};

export const updateVehicle = async (req: Request, res: Response) => {
  const vehicle = await service.updateVehicle(req.params.id as string, req.body);
  res.json(vehicle);
};

export const deleteVehicle = async (req: Request, res: Response) => {
  await service.deleteVehicle(req.params.id as string);
  res.json({ message: "Vehicle deleted" });
};

