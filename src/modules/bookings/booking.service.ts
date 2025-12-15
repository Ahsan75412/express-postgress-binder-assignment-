import { pool } from "../../config/db";

export const createBooking = async (data: any) => {
  // Check vehicle availability
  const vehicleRes = await pool.query(
    `SELECT * FROM vehicles WHERE id=$1 AND availability_status='available'`,
    [data.vehicle_id]
  );

  if (!vehicleRes.rows.length) throw new Error("Vehicle not available");

  // Calculate total price
  const days =
    (new Date(data.rent_end_date).getTime() -
      new Date(data.rent_start_date).getTime()) /
    (1000 * 60 * 60 * 24);

  const total_price = days * vehicleRes.rows[0].daily_rent_price;

  // Insert booking
  const booking = await pool.query(
    `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price)
     VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [data.customer_id, data.vehicle_id, data.rent_start_date, data.rent_end_date, total_price]
  );

  // Update vehicle status
  await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
    [data.vehicle_id]
  );

  return booking.rows[0];
};

export const getBookings = async (user: any) => {
  if (user.role === "admin") {
    const res = await pool.query(`SELECT * FROM bookings`);
    return res.rows;
  } else {
    const res = await pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [user.id]);
    return res.rows;
  }
};

export const updateBooking = async (id: string, user: any) => {
  const bookingRes = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [id]);
  if (!bookingRes.rows.length) throw new Error("Booking not found");

  const booking = bookingRes.rows[0];

  // Admin marks returned
  if (user.role === "admin") {
    await pool.query(
      `UPDATE bookings SET status='returned' WHERE id=$1`,
      [id]
    );
    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id]
    );
    return { message: "Booking returned" };
  }

  // Customer cancels if before start date
  if (user.role === "customer") {
    if (new Date() > new Date(booking.rent_start_date)) {
      throw new Error("Cannot cancel after start date");
    }
    await pool.query(
      `UPDATE bookings SET status='cancelled' WHERE id=$1`,
      [id]
    );
    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id]
    );
    return { message: "Booking cancelled" };
  }

  throw new Error("Forbidden");
};
