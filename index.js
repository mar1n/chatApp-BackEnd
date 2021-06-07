const mongoose = require("mongoose");
const createServer = require("./server");
require("dotenv").config();
// connect to db
const port = process.env.PORT || 8000;
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
      console.log("DB connected")
      const app = createServer();

      app.listen(port, () => {
          console.log("Server has started on Port: ", port);
      })
    })
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));