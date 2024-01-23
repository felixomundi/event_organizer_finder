const express = require("express");
const { getCouponTypes, createCouponType, editCouponType, deleteCouponType } = require("../controllers/couponTypeController");
const  isAdmin  = require("./../middleware/adminMiddleware");
const router = express.Router();
router.get("/", isAdmin, getCouponTypes);
router.post("/create", isAdmin, createCouponType);
router.put("/update", isAdmin, editCouponType);
router.post("/delete", isAdmin, deleteCouponType);
module.exports = router;