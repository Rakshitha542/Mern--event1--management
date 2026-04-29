const express = require("express");
const router = express.Router();

const {
  addEvent,
  getEvents,
  deleteEvent,
  updateEvent,
  searchEvent,
  registerEvent,
  getParticipants
} = require("../controllers/eventController");

router.post("/", addEvent);
router.get("/", getEvents);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);

router.get("/search", searchEvent);
router.post("/register/:id", registerEvent);
router.get("/participants/:id", getParticipants);

module.exports = router;