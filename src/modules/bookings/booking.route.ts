import { Router } from "express";
import * as controller from "./booking.controller";
import { authMiddleware } from "../../middlewares/auth";
import { authorize } from "../../middlewares/role";


const router = Router();

// Customer or Admin can create booking
router.post("/", authMiddleware, authorize("customer","admin"), controller.createBooking);

// Role-based view
router.get("/", authMiddleware, controller.getBookings);

// Admin can mark returned, customer can cancel
router.put("/:id", authMiddleware, controller.updateBooking);

export default router;
