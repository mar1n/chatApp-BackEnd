const user = require("../models/user");

module.exports = function (io) {
  module.socketApi = io.on("connection", (socket) => {
    console.log("A User connected", socket.id);

    var cursor = user.find({}, (err, user) => {
      if (err || !user) {
        console.log("-*-Szymon-*- GET failed!!");
      }
      socket.emit("initialList", user);
      console.log("***Szymon*** GET worked!!");
    });
    socket.on("listUsers", (id) => {
      console.log("my user id", id);
      user.find({ _id: { $ne: id } }, (err, result) => {
        if (err) {
          console.log("**Szymon Faild ERR", err);
        } else {
            console.log("loadUsers", result);
            io.emit("loadUsers", result);
        }
      });
    });

    // socket.on("initialList", (id) => {
    //     // var todoItem = new todoModel({
    //     // 	itemId:addData.id,
    //     // 	item:addData.item,
    //     // 	completed: addData.completed
    //     // })
    //     user.find({}, (err, user) => {
    //       if (err) {
    //         console.log("didn't load data", err);
    //       } else {
    //         io.emit("ListLoad", user);
    //       }
    //     });
    //     // todoItem.save((err,result)=> {
    //     // 	if (err) {console.log("---Gethyl ADD NEW ITEM failed!! " + err)}
    //     // 	else {
    //     // 		// connections.forEach((currentConnection)=>{
    //     // 		// 	currentConnection.emit('itemAdded',addData)
    //     // 		// })
    //     // 		io.emit('itemAdded',addData)

    //     // 		console.log({message:"+++Gethyl ADD NEW ITEM worked!!"})
    //     // 	}
    //     // })
    //   });
  });
  return module;
};
