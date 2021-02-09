const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user');
const app = express();

//Database 연결
const db = require('./models');
db.sequelize
  .sync()
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch(console.error);

//프론트에서 받아온 data를 req.body에 넣어주기 위함
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
  })
);
app.get('/', (req, res) => {
  res.send('ㅎㅇ');
});

app.use('/user', userRouter);

app.listen(5000, () => {
  console.log('실행완료');
});
