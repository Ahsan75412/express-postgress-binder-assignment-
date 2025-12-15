import { Router } from "express";
import * as controller from "./user.controller";
import { authMiddleware } from "../../middlewares/auth";
import { authorize } from "../../middlewares/role";
// import { authMiddleware } from "../../middleware/auth";
// import { authorize } from "../../middleware/role";

const router = Router();

// Only admin can view all users
router.get("/", authMiddleware, authorize("admin"), controller.getUsers);

// Admin can update any user, customer can update own profile
router.put("/:id", authMiddleware, controller.updateUser);

// Only admin can delete
router.delete("/:id", authMiddleware, authorize("admin"), controller.deleteUser);

export default router;
