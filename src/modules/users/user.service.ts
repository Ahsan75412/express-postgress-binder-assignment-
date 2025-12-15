import { pool } from "../../config/db";

export const getUsers = async () => {
  const result = await pool.query(`SELECT id,name,email,phone,role FROM users`);
  return result.rows;
};

export const updateUser = async (id: string, data: any, user: any) => {
  // Admin can update any, customer can update own
  if (user.role !== "admin" && user.id !== Number(id)) {
    throw new Error("Forbidden");
  }

  const result = await pool.query(
    `UPDATE users SET name=$1, phone=$2 WHERE id=$3 RETURNING id,name,email,phone,role`,
    [data.name, data.phone, id]
  );
  return result.rows[0];
};

export const deleteUser = async (id: string) => {
  await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
};
