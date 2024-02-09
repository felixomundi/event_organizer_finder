const express = require("express");
const { bookTicket, getTickets, getMyTickets } = require("../controllers/ticketController");
const router = express.Router();
const isOrganizer = require("../middleware/organizerMiddleware");
const isAuthenticated = require("../middleware/authMiddleware");
router.get("/", isOrganizer, getTickets);
router.get('/getMyTickets', isAuthenticated, getMyTickets);
router.post("/", isAuthenticated, bookTicket);

module.exports = router;