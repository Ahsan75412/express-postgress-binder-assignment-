

// // thik ta copy git 
// import * as service from "./booking.service";
// import { Request, Response } from "express";

// export const createBooking = async (req: Request, res: Response) => {
//   const booking = await service.createBooking(req.body);
//   res.status(201).json(booking);
// };

// export const getBookings = async (req: any, res: Response) => {
//   const bookings = await service.getBookings(req.user);
//   res.json(bookings);
// };

// export const updateBooking = async (req: any, res: Response) => {
//   const updated = await service.updateBooking(req.params.id, req.user);
//   res.json(updated);
// };




// import * as service from "./booking.service";
// import { Request, Response } from "express";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: any;
//     }
//   }
// }

// export const createBooking = async (req: Request, res: Response) => {
//   try {
//     const booking = await service.createBooking(req.body);
//     res.status(201).json({
//       success: true,
//       message: "Booking created successfully",
//       data: booking,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message || "Failed to create booking",
//       data: null,
//     });
//   }
// };

// export const getBookings = async (req: Request, res: Response) => {
//   try {
//     const bookings = await service.getBookings(req.user); // pass logged-in user
//     res.json({
//       success: true,
//       message: bookings.length
//         ? "Bookings fetched successfully"
//         : "No bookings found",
//       data: bookings,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message || "Failed to fetch bookings",
//       data: [],
//     });
//   }
// };

// export const updateBooking = async (req: Request, res: Response) => {
//   try {
//     const updatedBooking = await service.updateBooking(
//       req.params.id as string,
//       req.user
//     );

//     if (!updatedBooking) {
//       return res.status(404).json({
//         success: true,
//         message: "Booking not found",
//         data: null,
//       });
//     }

//     res.json({
//       success: true,
//       message: "Booking updated successfully",
//       data: updatedBooking,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message || "Failed to update booking",
//       data: null,
//     });
//   }
// };





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
