import { pool } from "../../config/db";

export const createVehicle = async (data: any) => {
  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price)
     VALUES($1,$2,$3,$4) RETURNING *`,
    [data.vehicle_name, data.type, data.registration_number, data.daily_rent_price]
  );
  return result.rows[0];
};

export const getVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result.rows;
};

export const getVehicle = async (id: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id]);
  return result.rows[0];
};

export const updateVehicle = async (id: string, data: any) => {
  const result = await pool.query(
    `UPDATE vehicles SET vehicle_name=$1, type=$2, daily_rent_price=$3 WHERE id=$4 RETURNING *`,
    [data.vehicle_name, data.type, data.daily_rent_price, id]
  );
  return result.rows[0];
};

export const deleteVehicle = async (id: string) => {
  await pool.query(`DELETE FROM vehicles WHERE id=$1`, [id]);
};
