const user = require("../models/user");

module.exports = function(io) {
    module.socketApi = io.on('connection', (socket) => {
        console.log('A User connected', socket.id);
        
        var cursor = user.find({ }, (err, user) => {
          if (err || !user) {
            console.log("-*-Szymon-*- GET failed!!")
          }
            socket.emit('initialList', user);
            console.log('***Szymon*** GET worked!!');
        });
      });
      return module;
}