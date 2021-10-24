const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const socketServer = require("socket.io");

function createServer() {
  require("dotenv").config();
  const app = express();

  //import routes
  const authRoutes = require("./routes/auth");
  const userRoutes = require("./routes/user");
  const itemRoutes = require("./routes/item");
  const roomsRoutes = require("./routes/rooms");
  const { body } = require("express-validator");

  // app middleware
  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post("/post-test", (req, res) => {
    console.log("Got body:", req.body);
    res.sendStatus(200);
  });

  //app.use(cors()); // allows all origins
  if ((process.env.NODE_ENV = "development")) {
    app.use(cors({ origin: `http://localhost:3000` }));
  }

  // middleware
  app.use("/api", authRoutes);
  app.use("/api", userRoutes);
  app.use("/api", itemRoutes);
  app.use("/api", roomsRoutes);

  
  var serve = http.createServer(app);
  const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    const backEndMessage = {
      name: "BackEnd Message",
      message: "Hello from backEnd",
    };
    console.log("connect");
    socket.emit("backEnd", backEndMessage);
    socket.on("addMessage", (msg) => {
      console.log("msg", msg);
      io.emit("responseBackEnd", true);
    });
  });
  return httpServer;
  // var io = socketServer(serve);
  // serve.listen(port, () => {
  //   console.log(`API is running on port ${port}`);
  // });

  // /***************************************************************************************** */
  // /* Socket logic starts here																   */
  // /***************************************************************************************** */
  // const connections = [];
  // io.on('connection', function (socket) {
  // 	console.log("Connected to Socket!!"+ socket.id)
  // 	connections.push(socket)
  // 	socket.on('disconnect', function(){
  // 		console.log('Disconnected - '+ socket.id);
  // 	});

  // 	var cursor = todolist.find({},(err,result)=>{
  // 				if (err){
  // 					console.log("---Gethyl GET failed!!")
  // 				}
  // 				else {
  // 					socket.emit('initialList',result)
  // 					console.log("+++Gethyl GET worked!!", result)
  // 					console.log('Final check!');
  // 				}
  // 			})
  // 	// 		.cursor()
  // 	// cursor.on('data',(res)=> {socket.emit('initialList',res)})
  // 	socket.on('messageSent', (message) => {

  // 	})
  // 	socket.on('addItem',(addData)=>{
  // 		var todoItem = new todolist({
  // 			itemId:addData.id,
  // 			item:addData.item,
  // 			completed: addData.completed
  // 		})

  // 		todoItem.save((err,result)=> {
  // 			if (err) {console.log("---Gethyl ADD NEW ITEM failed!! " + err)}
  // 			else {
  // 				// connections.forEach((currentConnection)=>{
  // 				// 	currentConnection.emit('itemAdded',addData)
  // 				// })
  // 				io.emit('itemAdded',addData)

  // 				console.log({message:"+++Gethyl ADD NEW ITEM worked!!"})
  // 			}
  // 		})
  // 	})

  // 	socket.on('markItem',(markedItem)=>{
  // 		var condition   = {itemId:markedItem.id},
  // 			updateValue = {completed:markedItem.completed}

  // 		todoModel.update(condition,updateValue,(err,result)=>{
  // 			if (err) {console.log("---Gethyl MARK COMPLETE failed!! " + err)}
  // 			else {
  // 				// connections.forEach((currentConnection)=>{
  // 				// 	currentConnection.emit('itemMarked',markedItem)
  // 				// })
  // 				io.emit('itemMarked',markedItem)

  // 				console.log({message:"+++Gethyl MARK COMPLETE worked!!"})
  // 			}
  // 		})
  // 	})

  // });
}

module.exports = createServer;
