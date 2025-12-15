import { Pool } from "pg";
import config from "./intex";


export const pool = new Pool({
  connectionString: config.connection_str,
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone VARCHAR(20),
      role VARCHAR(20) CHECK (role IN ('admin','customer')) DEFAULT 'customer'
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id SERIAL PRIMARY KEY,
      vehicle_name VARCHAR(100) NOT NULL,
      type VARCHAR(20),
      registration_number VARCHAR(50) UNIQUE NOT NULL,
      daily_rent_price INT CHECK (daily_rent_price > 0),
      availability_status VARCHAR(20) DEFAULT 'available'
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      customer_id INT REFERENCES users(id),
      vehicle_id INT REFERENCES vehicles(id),
      rent_start_date DATE NOT NULL,
      rent_end_date DATE NOT NULL,
      total_price INT CHECK (total_price > 0),
      status VARCHAR(20) DEFAULT 'active'
    )
  `);
};

export default initDB;
