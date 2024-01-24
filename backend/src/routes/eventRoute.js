const express = require("express");
const { getOrganizerEvents } = require("../controllers/organizer/eventController");
const  isOrganizer  = require("./../middleware/organizerMiddleware");
const router = express.Router();
router.get("/", isOrganizer, getOrganizerEvents);
// router.post("/create", isAdmin, createCouponType);
// router.put("/update", isAdmin, editCouponType);
// router.post("/delete", isAdmin, deleteCouponType);
module.exports = router;