const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { User } = require('../models');

router.post('/', async (req, res) => {
  const { email } = req.body;
  try {
    const exUser = await User.findOne({
      where: { email: email },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 이메일입니다.');
    }
  } catch (error) {
    console.error(error);
  }

  let authNum = Math.random().toString().substr(2, 6);

  let smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  let mailOptions = await smtpTransport.sendMail({
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: '회원가입을 위한 이메일 인증번호입니다.',
    text: '인증번호 6자리 숫자를 입력해주세요:' + authNum,
  });

  smtpTransport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    console.log('Finish sending email : ' + info.response);
    res.send(authNum);
    smtpTransport.close();
  });
});

module.exports = router;
