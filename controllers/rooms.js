const Rooms = require("../models/rooms");

exports.read = (req, res) => {
  const userId = req.params.id;
  Rooms.find({ users: { $elemMatch: { id: userId } } }).exec((err, room) => {
    if (err || !room) {
      return res.status(400).json({
        error: "Room not found",
      });
    }
    res.json(room);
  });
};

exports.addMessage = (req, res) => {
  const userId = req.params.id;
  const name = req.params.name;
  const message = req.params.message;

  Rooms.findOneAndUpdate(
    { id: userId },
    {
      $push: {
        messages: {
          text: message,
          name: name,
          timestamp: new Date(),
          id: 2,
          unread: false,
        },
      },
    }
  ).exec((err, room) => {
    if (err || !room) {
      return res.status(400).json({
        error: "Update problem, pleas try again",
      });
    }
    console.log("Record updated successfully");
    console.log(room);

    res.json(room);
  });
};
