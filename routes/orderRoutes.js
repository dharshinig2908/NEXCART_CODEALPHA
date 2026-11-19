const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    placeOrder,
    getMyOrders
} = require("../controllers/orderController");

// Place Order
router.post("/", authMiddleware, placeOrder);

// Get My Orders
router.get("/my-orders", authMiddleware, getMyOrders);

module.exports = router;