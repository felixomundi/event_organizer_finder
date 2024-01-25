const express = require("express");
const { bookTicket, getTickets } = require("../controllers/organizer/ticketController");
const router = express.Router();
const isOrganizer = require("../middleware/organizerMiddleware");

router.get("/", isOrganizer, getTickets);
router.post("/", isOrganizer, bookTicket);

module.exports = router;