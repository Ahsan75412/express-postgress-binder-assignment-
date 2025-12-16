
import express from "express";

// Import routes
import authRoutes from "./modules/auth/auth.routes";
import vehicleRoutes from "./modules/vehicles/vehicle.route";
import bookingRoutes from "./modules/bookings/booking.route";
import userRoutes from "./modules/users/user.route";



const app = express();

// Body parser
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);         
app.use("/api/v1/users", userRoutes);       
app.use("/api/v1/vehicles", vehicleRoutes); 
app.use("/api/v1/bookings", bookingRoutes); 

// Default route
app.get("/", (_req, res) => {
  res.send("Vehicle Rental System API is running!");
});

export default app;
