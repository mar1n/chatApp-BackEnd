const Rooms = require("../models/rooms");
const bodyParser = require("body-parser");

exports.read = (req, res) => {
  const userId = req.params.id;
  console.log("rooms loading...");
  Rooms.find({ users: { $elemMatch: { name: userId } } }).exec((err, room) => {
    if (err || !room) {
      return res.status(400).json({
        error: "Room not found",
      });
    }
    res.json(room);
  });
};

exports.addRoom = (req, res) => {
  console.log("address object", req.query.users);
  console.log("params", req.param("users"));
  console.log("body", req.body);

  const users = req.query.users;
  const addRoom = new Rooms({
    title: "Angry",
    users,
  });
  addRoom.save(function (err, newRoom) {
    if (err) {
      console.log("ROOM ADD ERROR", err);
      return res.status(400).json({
        error: "User add faild",
      });
    }
    res.json(newRoom);
  });
};

exports.addMessage = (req, res) => {
  const userId = req.params.id;
  const name = req.params.name;
  const message = req.params.message;

  Rooms.find({ _id: userId }, { users: 1, _id: 0 })
    .lean()
    .then((users) => {
      console.log("addMessage users", users);
      const unReadUsers = users[0].users.map((name) => ({ unread: false, ...name }));

      return Rooms.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            messages: {
              text: message,
              name: name,
              timestamp: new Date(),
              id: 2,
              unread: false,
              read: unReadUsers,
            },
          },
        },
        { new: true }
      );
    })
    .then((room) => {
      if (!room) {
        return res.status(400).json({
          error: "Update problem, pleas try again",
        });
      }
      console.log("Record updated successfully");
      console.log(room);

      res.json(room);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.deleteMessage = (req, res) => {
  const roomId = req.params.roomId;
  const messageId = req.params.messageId;

  Rooms.findOneAndUpdate(
    { _id: roomId },
    {
      $pull: {
        messages: {
          _id: messageId,
        },
      },
    },
    { new: true }
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

exports.readAllMessage = (req, res) => {
  const roomId = req.params.roomId;
  //const roomId = '5fff323129a4d305c4c4f588';
  const name = req.params.name;
  //const name = 'Szymon Dawidowicz';
  Rooms.findOneAndUpdate(
    { _id: roomId, "messages.name": name },
    { $set: { "messages.$[elem].unread": false } },
    { arrayFilters: [{ "elem.name": { $ne: name } }], multi: true, new: true }
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
// JUST FOR TESTS
exports.readAllUsers = (req, res) => {
  Rooms.find({ _id: "600300f7b56d1446f49a59b6" }, { users: 1, _id: 0 })
    .then((room) => {
      if (!room) {
        return res.status(400).json({
          error: "Update problem, pleas try again",
        });
      }
      console.log("Record updated successfully");
      console.log(room);

      res.json(room);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
