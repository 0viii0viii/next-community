const passport = require('passport');
const local = require('./local');
const kakao = require('./kakao');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    //session에서 일단 user.id만 갖고있기(메모리)
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });
  local();
  kakao();
};
