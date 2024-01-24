const express = require("express");
const { getOrganizerEvents, createEventByOrganizer, deleteEventByOrganizer } = require("../controllers/organizer/eventController");
const  isOrganizer  = require("./../middleware/organizerMiddleware");
const router = express.Router();
router.get("/", isOrganizer, getOrganizerEvents);
router.post("/", isOrganizer, createEventByOrganizer);
router.get("/:id", isOrganizer, deleteEventByOrganizer);
module.exports = router;