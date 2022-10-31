require("dotenv").config();

const express = require('express')
const app = express()
const port = process.env.PORT
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`${port}에서 돌아가는 중`)
})


mongoose
  .connect(
    process.env.URL
  )
  .then(() => console.log("MongoDB 연결 성공..."))
  .catch((err) => console.log(err));

const { User } = require('./models/User');


app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    return err
      ? res.json({ success: false, err })
      : res.status(200).json({ success: true, userInfo: userInfo });
  });
});