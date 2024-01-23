const express = require("express");
const { createOrder, userOrders, getOrder, adminOrders, adminOrderDetail } = require("../controllers/orderController");
const router = express.Router();
const protect = require("./../middleware/authMiddleware");
const isAdmin = require("./../middleware/adminMiddleware")
router.post("/create", protect, createOrder);
router.get("/user/orders", protect, userOrders);
router.get("/user/orders/findById/:id", protect, getOrder);
router.get("/admin/orders", isAdmin, adminOrders);
router.get("/admin/orders/findById/:id",isAdmin, adminOrderDetail);
module.exports = router;