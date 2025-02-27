import mongoose from "mongoose";
import User from "./models/user.model.js";
import connectDB from "./lib/db.js";

async function initUsers() {
  connectDB();
  const users = [
    {
      fullName: "John Doe",
      email: "john.doe@example.com",
      password: "password123", // You should hash passwords in a real app
    },
    {
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      password: "securePass456",
    },
    {
      fullName: "Alice Johnson",
      email: "alice.johnson@example.com",
      password: "alicePassword789",
    },
  ];

  await User.insertMany(users);
  console.log("Users initialized successfully");

  mongoose.connection.close();
}

initUsers();
