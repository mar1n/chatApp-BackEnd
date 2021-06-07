const mongoose = require("mongoose");

beforeAll(async () => {
  const url = "mongodb://127.0.0.1:27017/redux";

  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
it('Should save user to database', async done => {
    const res = await request.post('/signup')
      .send({
        name: 'Zell',
        email: 'testing@gmail.com'
      })
    done()
  })