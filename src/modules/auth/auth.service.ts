


// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { pool } from "../../config/db";
// import config from "../../config/intex";


// export const signin = async (email: string, password: string) => {
//   const userRes = await pool.query(
//     "SELECT * FROM users WHERE email=$1",
//     [email]
//   );

//   if (!userRes.rows.length) {
//     throw new Error("User not found");
//   }

//   const user = userRes.rows[0];

//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) {
//     throw new Error("Invalid credentials");
//   }

//   // ✅ IMPORTANT: options আলাদা
//   const signOptions: jwt.SignOptions = {
//     expiresIn: "1d", // or config.jwt_expires
//   };

//   // ✅ THIS MATCHES THE FUNCTION SIGNATURE EXACTLY
//   const token = jwt.sign(
//     { id: user.id, role: user.role },
//     config.jwt_secret as jwt.Secret,
//     signOptions
//   );

//   return { token };
// };
// export function signup(body: any) {
//   throw new Error("Function not implemented.");
// }



// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { pool } from "../../config/db";
// import config from "../../config/intex";

// export const signup = async (data: any) => {
//   const hashedPassword = await bcrypt.hash(data.password, 10);

//   const result = await pool.query(
//     `
//     INSERT INTO users (name, email, password, phone, role)
//     VALUES ($1, $2, $3, $4, $5)
//     RETURNING id, name, email, role
//     `,
//     [
//       data.name,
//       data.email,
//       hashedPassword,
//       data.phone,
//       data.role || "customer",
//     ]
//   );

//   return result.rows[0];
// };

// export const signin = async (email: string, password: string) => {
//   const userRes = await pool.query(
//     `SELECT * FROM users WHERE email = $1`,
//     [email]
//   );

//   if (!userRes.rows.length) {
//     throw new Error("User not found");
//   }

//   const user = userRes.rows[0];

//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) {
//     throw new Error("Invalid credentials");
//   }

//      const signOptions: jwt.SignOptions = {
//       expiresIn: "1d", 
//   };


//   const token = jwt.sign(
//     { id: user.id, role: user.role },
//     config.jwt_secret as jwt.Secret,
//     signOptions
//   );

//   return { token };
// };




import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../../config/db";
import config from "../../config/intex";

export const signup = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, phone, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, phone, role`,
    [
      data.name,
      data.email,
      hashedPassword,
      data.phone,
      data.role || "customer",
    ]
  );

  return result.rows[0];
};

export const signin = async (email: string, password: string) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  if (!result.rows.length) {
    throw new Error("User not found");
  }

  const user = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }


       const signOptions: jwt.SignOptions = {
      expiresIn: "1d", 
  };
  
  const token = jwt.sign(
    { id: user.id, role: user.role },
    config.jwt_secret as jwt.Secret,
    signOptions
  );

  delete user.password;

  return { token, user };
};
