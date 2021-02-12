const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user');
//Passport 연결
const passportConfig = require('./passport');
const passport = require('passport');

passportConfig();
dotenv.config();

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
    origin: 'http://localhost:3000',
    credentials: true, // 쿠키 전달하기 위함 ->saga index에 withCredential:true적용
  })
);
//로그인 related 미들웨어
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get('/', (req, res) => {
  res.send('ㅎㅇ');
});

app.use('/user', userRouter);

app.listen(5000, () => {
  console.log('실행완료');
});
