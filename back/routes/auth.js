const express = require('express');
const passport = require('passport');

const router = express.Router();

// kakao 로그인

router.get('/kakao', passport.authenticate('kakao'));

router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: 'http://localhost:3000/login',
  }),
  (req, res) => {
    res.redirect('http://localhost:3000/');
  }
);

module.exports = router;
