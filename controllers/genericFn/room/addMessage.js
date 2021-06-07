const Rooms = require("../../../models/rooms");
module.exports = function (userId, loginUserName, message) {
    return Rooms.find({ _id: userId }, { users: 1, _id: 0 })
      .lean()
      .then((users) => {
        console.log("users", users[0]);
        const unReadUsers = users[0].users.map((name) => {
          return name.name === loginUserName
            ? { unread: true, ...name }
            : { unread: false, ...name };
        });
  
        return Rooms.findOneAndUpdate(
          { _id: userId },
          {
            $push: {
              messages: {
                text: message,
                name: loginUserName,
                timestamp: new Date(),
  
                read: unReadUsers,
              },
            },
          },
          { new: true }
        );
      })
      .then((room) => {
        if (!room) {
          return { status: "400" };
        }
        console.log("Record updated successfully");
        //console.log(room);
        return { status: "200", room: room };
      })
      .catch((err) => {
        return { status: "500", error: err };
      });
  };
  