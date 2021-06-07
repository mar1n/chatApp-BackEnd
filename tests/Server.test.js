const mongoose = require("mongoose");
const createServer = require("../server");
const Rooms = require("../models/rooms");
const supertest = require("supertest");
require("dotenv").config();

beforeEach((done) => {
  mongoose.connect(
    "mongodb://redux:turboman54@localhost:27017/redux",
    {
      useNewUrlParser: true,
    },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.close(() => done());
});

const app = createServer();

test("add new msg", async () => {
const roomId = "5fff323129a4d305c4c4f588";
const userName = "Szymon Dawidowicz";
const newMsg = "jest test"
//   const roomUsers = await Rooms.find(
//     { _id: roomId },
//     { users: 1, _id: 0 }
//   );

//   const unReadUsers = roomUsers[0].users.map((name) => {
//     return name.name === userName
//       ? { unread: true, ...name }
//       : { unread: false, ...name };
//   });

//   const addMsg = await Rooms.findOneAndUpdate(
//     { _id: "5fff323129a4d305c4c4f588" },
//     {
//       $push: {
//         messages: {
//           text: newMsg,
//           name: userName,
//           timestamp: new Date(),

//           read: unReadUsers,
//         },
//       },
//     },
//     { new: true, upsert: true, rawResult: true }
//   );

  await supertest(app).put(`/api/user/chat/room/message/${roomId}/${userName}/${newMsg}`)
    .expect(200)
    .then((response) => {
        expect(response).toEqual(newMsg);
    })
});
