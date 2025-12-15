# 🚗 Vehicle Rental System

> A backend API for managing vehicles, customers, and bookings with role-based access control.

**Live Deployment:** [Your Live URL Here](#)  
**GitHub Repository:** [https://github.com/Ahsan75412/express-postgress-binder-assignment-](#)

---

## 📝 Features

- **Vehicles Management**: Add, update, delete, and view vehicles.
- **User Management**: Register, login, view, and update user profiles.
- **Bookings Management**: Create, cancel, return bookings with automatic vehicle availability tracking.
- **Authentication & Authorization**:
  - Secure JWT-based authentication.
  - Role-based access control (`admin` & `customer`).
- **Data Validation**: Ensures booking dates, vehicle availability, and user input are valid.

---

## 🛠 Technology Stack

- **Backend**: Node.js + TypeScript
- **Web Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Security**: bcrypt
- **Environment Management**: dotenv
- **Other Tools**: tsx for running TypeScript directly, Nodemon for development

---





##🔧 Setup & Usage Instructions:

Clone the repository:

git clone <https://github.com/Ahsan75412/express-postgress-binder-assignment->
cd <PROJECT_FOLDER>


Install dependencies

npm install


Setup environment variables

##Create a .env file in the project root:

PORT=5000
DATABASE_URL='postgresql://neondb_owner:npg_7kJPTyioSRY9@ep-spring-dream-a852h4w0-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require'
JWT_SECRET= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
JWT_EXPIRES_IN=1d


###Run the server

###npm run dev


local Server:  http://localhost:5000/

database auto-init (tables creating)

Sign Up / Sign In

##Sign Up:
Endpoint: POST /api/v1/auth/signup
Body (JSON):

{
  "name": "ahsan",
  "email": "ahsan@gmail.com",
  "password": "ahsan1234",
  "phone": "01788403045"
}


##Sign In:
Endpoint: POST /api/v1/auth/signin
Body (JSON):

{
  "email": "ahsan@gmail.com",
  "password": "ahsan1234"
}


##Successful login gives JWT token:

{
    "success": true,
    "message": "Login successful",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzY1ODE5NjY5LCJleHAiOjE3NjU5MDYwNjl9.g6Q2cCSbDoonvjpS9umuq8L08H7fBPmupQqHAPill2U",
        "user": {
            "id": 2,
            "name": "ahsan",
            "email": "ahsan@gmail.com",
            "phone": "01788403045",
            "role": "admin"
        }
    }
}


##Access Protected Routes

For all routes that require authorization, include header:

Authorization: Bearer <JWT_TOKEN>


Example: create booking, update vehicle, etc.

API Endpoints Overview

Module	Endpoint	Method	Access
Auth	/auth/signup	POST	Public
Auth	/auth/signin	POST	Public
Vehicles	/vehicles	GET	Public
Vehicles	/vehicles/:id	GET	Public
Vehicles	/vehicles	POST	Admin
Vehicles	/vehicles/:id	PUT	Admin
Vehicles	/vehicles/:id	DELETE	Admin
Users	/users	GET	Admin
Users	/users/:id	PUT	Admin / Self
Users	/users/:id	DELETE	Admin
Bookings	/bookings	POST	Customer / Admin
Bookings	/bookings	GET	Role-based
Bookings	/bookings/:id	PUT	Customer / Admin
Bookings	/bookings/:id	GET	Role-based


##Notes:

 Customer can only manage their own bookings.

 Admin can manage all vehicles, users, and bookings.

 Vehicle status updates automatically on booking/cancel/return.

 Use Postman or similar API client for testing.


