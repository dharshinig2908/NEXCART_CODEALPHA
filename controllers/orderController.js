const Order = require("../models/order");

// PLACE NEW ORDER
exports.placeOrder = async (req, res) => {
    try {
        const { products, totalAmount } = req.body;

        if (!products || products.length === 0 || !totalAmount) {
            return res.status(400).json({
                success: false,
                message: "Please provide order details"
            });
        }

        const order = await Order.create({
            user: req.user.id,
            products,
            totalAmount
        });

        res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to place order"
        });
    }
};

// GET USER ORDERS
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to fetch orders"
        });
    }
};