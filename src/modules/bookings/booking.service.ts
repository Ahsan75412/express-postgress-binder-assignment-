// test 3 


import { pool } from "../../config/db";

interface User {
  id: number;
  role: string;
}

// Create a booking
export const createBooking = async (data: any, user: User) => {
  // Check if vehicle exists
  const vehicleRes = await pool.query(
    `SELECT * FROM vehicles WHERE id=$1`,
    [data.vehicle_id]
  );

  if (!vehicleRes.rows.length) throw new Error("Vehicle not found");

  const vehicle = vehicleRes.rows[0];

  // Check availability
  if (vehicle.availability_status !== "available") {
    throw new Error("Vehicle not available");
  }

  // Calculate total price
  const start = new Date(data.rent_start_date);
  const end = new Date(data.rent_end_date);
  const diffDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  const total_price = diffDays * vehicle.daily_rent_price;

  // Insert booking
  const result = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES($1,$2,$3,$4,$5,'active') RETURNING *`,
    [data.customer_id || user.id, data.vehicle_id, data.rent_start_date, data.rent_end_date, total_price]
  );

  // Update vehicle status to booked
  await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
    [data.vehicle_id]
  );

  return {
    ...result.rows[0],
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};

// Get all bookings (role-based)
export const getBookings = async (user: User) => {
  let query = `SELECT b.*, v.vehicle_name, v.daily_rent_price
               FROM bookings b
               JOIN vehicles v ON b.vehicle_id=v.id`;

  let params: any[] = [];

  if (user.role !== "admin") {
    query += ` WHERE b.customer_id=$1`;
    params.push(user.id);
  }

  const result = await pool.query(query, params);

  return result.rows.map((row) => ({
    id: row.id,
    customer_id: row.customer_id,
    vehicle_id: row.vehicle_id,
    rent_start_date: row.rent_start_date,
    rent_end_date: row.rent_end_date,
    total_price: row.total_price,
    status: row.status,
    vehicle: {
      vehicle_name: row.vehicle_name,
      daily_rent_price: row.daily_rent_price,
    },
  }));
};

// Get single booking by ID
export const getBookingById = async (bookingId: string, user: User) => {
  let query = `SELECT b.*, v.vehicle_name, v.daily_rent_price
               FROM bookings b
               JOIN vehicles v ON b.vehicle_id=v.id
               WHERE b.id=$1`;
  let params: any[] = [bookingId];

  if (user.role !== "admin") {
    params.push(user.id);
    query += ` AND b.customer_id=$2`;
  }

  const result = await pool.query(query, params);

  if (!result.rows.length) return null;

  const row = result.rows[0];
  return {
    id: row.id,
    customer_id: row.customer_id,
    vehicle_id: row.vehicle_id,
    rent_start_date: row.rent_start_date,
    rent_end_date: row.rent_end_date,
    total_price: row.total_price,
    status: row.status,
    vehicle: {
      vehicle_name: row.vehicle_name,
      daily_rent_price: row.daily_rent_price,
    },
  };
};

// Update booking (cancel or mark returned)
export const updateBooking = async (bookingId: string, data: any, user: User) => {
  const bookingRes = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [bookingId]);

  if (!bookingRes.rows.length) throw new Error("Booking not found");

  const booking = bookingRes.rows[0];

  // Customer can cancel before start date
  if (user.role === "customer") {
    const now = new Date();
    const startDate = new Date(booking.rent_start_date);
    if (now > startDate) throw new Error("Cannot cancel after start date");

    await pool.query(`UPDATE bookings SET status='cancelled' WHERE id=$1`, [bookingId]);

    // Free vehicle
    await pool.query(`UPDATE vehicles SET availability_status='available' WHERE id=$1`, [booking.vehicle_id]);
  }

  // Admin can mark returned
  if (user.role === "admin") {
    await pool.query(`UPDATE bookings SET status='returned' WHERE id=$1`, [bookingId]);
    await pool.query(`UPDATE vehicles SET availability_status='available' WHERE id=$1`, [booking.vehicle_id]);
  }

  const updated = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [bookingId]);
  return updated.rows[0];
};
