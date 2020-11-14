const Rooms = require("../models/rooms");

exports.read = (req, res) => {
    const userId = req.params.id;
    Rooms.findById(userId).exec((err, room) => {
      if (err || !room) {
        return res.status(400).json({
          error: "Room not found",
        });
      }
      res.json(room);
    });
  };