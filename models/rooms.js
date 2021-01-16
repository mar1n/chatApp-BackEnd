const mongoose = require("mongoose");

// user schema
const roomsScheama = new mongoose.Schema(
  {
    title: String,
    users: [{
        id: String,
        name: String
    }],
    messages: [{
        text: String,
        name: String,
        timestamp: Date,
        id: String,
        unread: Boolean,
        read: [{
          name: String,
          unread: Boolean,
        }]
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rooms", roomsScheama);
