
// test 3 


import { Request, Response } from "express";
import * as service from "./booking.service";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Create new booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = await service.createBooking(req.body, req.user);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// Get all bookings (role-based)
export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await service.getBookings(req.user);

    const message =
      bookings.length === 0 ? "No bookings found" : "Bookings fetched successfully";

    res.json({
      success: true,
      message,
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// Get single booking by ID (role-based)
export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await service.getBookingById(req.params.id as string, req.user);

    if (!booking) {
      return res.status(404).json({
        success: true,
        message: "Booking not found",
        data: null,
      });
    }

    res.json({
      success: true,
      message: "Booking fetched successfully",
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// Update booking (cancel or return)
export const updateBooking = async (req: Request, res: Response) => {
  try {
    const booking = await service.updateBooking(req.params.id as string, req.body, req.user);

    res.json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
