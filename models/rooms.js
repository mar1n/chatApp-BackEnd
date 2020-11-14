const mongoose = require("mongoose");

// user schema
const roomsScheama = new mongoose.Schema(
  {
    title: String,
    users: [{
        id: String,
        title: String
    }],
    messages: [{
        text: String,
        name: String,
        timestamp: Date,
        id: String,
        unread: Boolean
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rooms", roomsScheama);
