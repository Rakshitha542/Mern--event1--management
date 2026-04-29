const Event = require("../models/Event");

exports.addEvent = async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
};

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

exports.deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
};

exports.updateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(event);
};

exports.searchEvent = async (req, res) => {
  const events = await Event.find({
    name: { $regex: req.query.q, $options: "i" }
  });
  res.json(events);
};

exports.registerEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  event.participants.push(req.body.userId);
  await event.save();
  res.json({ message: "Registered" });
};

exports.getParticipants = async (req, res) => {
  const event = await Event.findById(req.params.id)
    .populate("participants");
  res.json(event.participants);
};