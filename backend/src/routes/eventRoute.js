const express = require("express");
const { getOrganizerEvents, createEventByOrganizer, deleteEventByOrganizer, updateEventStatusByOrganizer, updateEventByOrganizer } = require("../controllers/organizer/eventController");
const  isOrganizer  = require("./../middleware/organizerMiddleware");
const router = express.Router();
router.get("/", isOrganizer, getOrganizerEvents);
router.post("/", isOrganizer, createEventByOrganizer);
router.post("/update", isOrganizer, updateEventStatusByOrganizer);
router.put("/update_event", isOrganizer, updateEventByOrganizer);
router.get("/:id", isOrganizer, deleteEventByOrganizer);
module.exports = router;