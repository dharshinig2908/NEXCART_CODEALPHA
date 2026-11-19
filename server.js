const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import Routes and Database
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Frontend Files
app.use(express.static(__dirname + "/public"));

// Authentication Routes
app.use("/api/auth", authRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);

// Home Route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Health Check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "NEXCART server is running successfully!"
    });
});

// Database Connection and Server Start
const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`NEXCART server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Server startup failed:", error.message);
    });