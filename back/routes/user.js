const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');
const { Post } = require('../models');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');
const router = express.Router();

// POST /user/login
// @desc 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
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
      //passport 로그인실행 (index/ serializeUser실행)
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.status(200).json(user); // 로그인 완료 사용자 정보를  front로
    });
  })(req, res, next);
});

// POST /user/logout
// @desc 로그아웃
router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('done');
});

// POST /user/register
// @desc 회원가입
router.post('/register', isNotLoggedIn, async (req, res, next) => {
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

// POST /user/password
// @desc 비밀번호 변경
router.patch('/password', isLoggedIn, async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.update(
      {
        password: hashedPassword,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).send('비밀번호가 성공적으로 변경되었습니다');
  } catch (error) {
    console.error(error);
    next(error); //status 500
  }
});
// GET /user
// @desc 유저정보 가져오기
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'],
        },
      });

      res.status(200).json(user);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /user/nickname
// @desc 닉네임 수정하기
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );
    await Post.update(
      { creator: req.body.nickname },
      { where: { UserId: req.user.id } }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
