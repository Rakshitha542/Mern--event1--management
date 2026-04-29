const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  venue: String,
  date: String,
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

module.exports = mongoose.model("Event", eventSchema);