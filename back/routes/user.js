const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');
const router = express.Router();

// POST /user/login
// @desc 로그인
router.post('/login', (req, res, next) => {
  // 미들웨어 확장(res, next를 쓰기위함)
  passport.authenticate('local', (err, user, clierr) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (clierr) {
      return res.status(401).send(clierr.reason);
    }
    return req.login(user, async (loginErr) => {
      //passport 로그인실행
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.json(user); // 로그인 완료 사용자 정보를  front로
    });
  })(req, res, next);
});

// POST /user
// @desc 회원가입
router.post('/register', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    const exNick = await User.findOne({
      where: {
        nickname: req.body.nickname,
      },
    });
    if (exUser || exNick) {
      return res.status(403).send('이미 사용중인 이메일 혹은 닉네임입니다');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    next(error); //status 500
  }
});

module.exports = router;
