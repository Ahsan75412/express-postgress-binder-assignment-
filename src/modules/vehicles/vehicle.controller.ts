

// import * as service from "./vehicle.service";
// import { Request, Response } from "express";

// export const createVehicle = async (req: Request, res: Response) => {
//   const vehicle = await service.createVehicle(req.body);

//   res.status(201).json({
//     success: true,
//     message: "Vehicle created successfully",
//     data: vehicle,
//   });
// };

// export const getVehicles = async (_req: Request, res: Response) => {
//   const vehicles = await service.getVehicles();

//   res.json({
//     success: true,
//     message: "Vehicles fetched successfully",
//     data: vehicles,
//   });
// };

// export const getVehicleById = async (req: Request, res: Response) => {
//   const vehicle = await service.getVehicle(req.params.vehicleId as string);

//   res.json({
//     success: true,
//     message: "Vehicle fetched successfully",
//     data: vehicle,
//   });
// };




// export const updateVehicle = async (req: Request, res: Response) => {
//   const vehicle = await service.updateVehicle(
//     req.params.vehicleId as string,
//     req.body
//   );

//   res.json({
//     success: true,
//     message: "Vehicle updated successfully",
//     data: vehicle,
//   });
// };

// export const deleteVehicle = async (req: Request, res: Response) => {
//   await service.deleteVehicle(req.params.vehicleId as string);

//   res.json({
//     success: true,
//     message: "Vehicle deleted successfully",
//   });
// };



import * as service from "./vehicle.service";
import { Request, Response } from "express";

export const createVehicle = async (req: Request, res: Response) => {
  const vehicle = await service.createVehicle(req.body);

  res.status(201).json({
    success: true,
    message: "Vehicle created successfully",
    data: vehicle,
  });
};

export const getVehicles = async (_req: Request, res: Response) => {
  try {
    const vehicles = await service.getVehicles();

    res.json({
      success: true,
      message: vehicles.length > 0 ? "Vehicles fetched successfully" : "No vehicles found",
      data: vehicles || [],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch vehicles",
      data: [],
    });
  }
};

export const getVehicleById = async (req: Request, res: Response) => {
  try {
    const vehicle = await service.getVehicle(req.params.vehicleId as string);

    if (!vehicle) {
      return res.status(404).json({
        success: true,
        message: "Vehicle not found",
        data: null,
      });
    }

    res.json({
      success: true,
      message: "Vehicle fetched successfully",
      data: vehicle,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch vehicle",
      data: null,
    });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await service.updateVehicle(
      req.params.vehicleId as string,
      req.body
    );

    if (!vehicle) {
      return res.status(404).json({
        success: true,
        message: "Vehicle not found",
        data: null,
      });
    }

    res.json({
      success: true,
      message: "Vehicle updated successfully",
      data: vehicle,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update vehicle",
      data: null,
    });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    await service.deleteVehicle(req.params.vehicleId as string);

    res.json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete vehicle",
    });
  }
};
