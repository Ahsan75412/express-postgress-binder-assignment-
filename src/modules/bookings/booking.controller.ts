import * as service from "./booking.service";
import { Request, Response } from "express";

export const createBooking = async (req: Request, res: Response) => {
  const booking = await service.createBooking(req.body);
  res.status(201).json(booking);
};

export const getBookings = async (req: any, res: Response) => {
  const bookings = await service.getBookings(req.user);
  res.json(bookings);
};

export const updateBooking = async (req: any, res: Response) => {
  const updated = await service.updateBooking(req.params.id, req.user);
  res.json(updated);
};
