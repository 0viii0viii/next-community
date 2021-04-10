const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const searchRouter = require('./routes/search');
const categoryRouter = require('./routes/category');
const authRouter = require('./routes/auth');
const emailRouter = require('./routes/email');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
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

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined')); //log가 구체적
  app.use(hpp()); //보안에 유용
  app.use(helmet());
} else {
  app.use(morgan('dev'));
}

//프론트에서 받아온 data를 req.body에 넣어주기 위함
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['http://localhost:3000', 'gunners88.com', 'http://3.36.74.84'], //프론트 ip cors적용
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
app.use('/post', postRouter);
app.use('/search', searchRouter);
app.use('/category', categoryRouter);
app.use('/auth', authRouter);
app.use('/email', emailRouter);

app.listen(80, () => {
  console.log('실행완료');
});
