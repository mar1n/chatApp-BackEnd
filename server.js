const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


require("dotenv").config();

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// connect to db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

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
app.post('/post-test', (req, res) => {
  console.log('Got body:', req.body);
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

const port = process.env.PORT || 8000;
http.listen(port, () => {
  console.log(`API is running on port ${port}`);
});

const socketApi = require("./socket")(io);
socketApi.socketApi;