// import { Router } from "express";
// import * as controller from "./vehicle.controller";
// import { authMiddleware } from "../../middlewares/auth";
// import { authorize } from "../../middlewares/role";


// const router = Router();

// // Admin-only routes
// router.post("/", authMiddleware, authorize("admin"), controller.createVehicle);
// router.put("/:id", authMiddleware, authorize("admin"), controller.updateVehicle);
// router.delete("/:id", authMiddleware, authorize("admin"), controller.deleteVehicle);

// // Public routes
// router.get("/", controller.getVehicles);
// router.get("/:id", controller.getVehicle);

// export default router;



import { Router } from "express";
import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "./vehicle.controller";

const router = Router();

router.post("/", createVehicle);
router.get("/", getVehicles);
router.get("/:vehicleId", getVehicleById);
router.put("/:vehicleId", updateVehicle);
router.delete("/:vehicleId", deleteVehicle);

export default router;
