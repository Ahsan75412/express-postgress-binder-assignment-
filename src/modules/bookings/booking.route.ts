

// import { Router } from "express";
// import * as controller from "./booking.controller";
// import { authMiddleware } from "../../middlewares/auth";
// import { authorize } from "../../middlewares/role";


// const router = Router();

// // Customer or Admin can create booking
// router.post("/", authMiddleware, authorize("customer","admin"), controller.createBooking);

// // Role-based view
// router.get("/", authMiddleware, controller.getBookings);

// // Admin can mark returned, customer can cancel
// router.put("/:id", authMiddleware, controller.updateBooking);

// export default router;



// import { Router } from "express";
// import * as controller from "./booking.controller";
// import { authMiddleware } from "../../middlewares/auth";
// import { authorize } from "../../middlewares/role";


// const router = Router();

// // Customer or Admin can create booking
// router.post(
//   "/",
//   authMiddleware,
//   authorize("customer", "admin"),
//   controller.createBooking
// );

// // Role-based view
// router.get("/", authMiddleware, controller.getBookings);

// // Admin can mark returned, customer can cancel
// router.put("/:id", authMiddleware, controller.updateBooking);

// export default router;






// test 3


import { Router } from "express";
import * as controller from "./booking.controller";
import { authMiddleware } from "../../middlewares/auth";
import { authorize } from "../../middlewares/role";

const router = Router();

// Customer or Admin can create booking
router.post("/", authMiddleware, authorize("customer", "admin"), controller.createBooking);

// Admin sees all bookings, customer sees own
router.get("/", authMiddleware, controller.getBookings);

// Get single booking by ID (role-based)
router.get("/:id", authMiddleware, controller.getBookingById);

// Admin can mark returned, customer can cancel
router.put("/:id", authMiddleware, controller.updateBooking);

export default router;

