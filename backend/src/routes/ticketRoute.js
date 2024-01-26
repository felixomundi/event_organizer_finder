const express = require("express");
const { bookTicket, getTickets } = require("../controllers/organizer/ticketController");
const router = express.Router();
const isOrganizer = require("../middleware/organizerMiddleware");
const isAuthenticated = require("../middleware/authMiddleware");
router.get("/", isOrganizer, getTickets);
router.post("/", isAuthenticated, bookTicket);

module.exports = router;