//AWS S3 설정
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const { Post } = require('../models');
const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: 'next-community/upload',
    region: 'ap-northeast-2',
    key(req, file, cb) {
      //파일 이름이 우연히 같더라도 업로드 날짜를 넣어주어 중복을 방지
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});

// POST  /post/image
// @desc post image on editor
router.post('/image', uploadS3.array('upload', 5), async (req, res, next) => {
  try {
    console.log(req.files.map((v) => v.location));
    console.log(req.file);
    res.json({ uploaded: true, url: req.files.map((v) => v.location) });
  } catch (error) {
    console.error(error);
    res.json({ uploaded: false, url: null });
  }
});

// POST  /post
// @desc  Upload A Post
router.post('/', uploadS3.none(), async (req, res, next) => {
  try {
    const { title, content, fileUrl, category, creator } = req.body;
    const newPost = await Post.create({
      title,
      content,
      category,
      fileUrl,
      creator,
    });
    return res.send('성공');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
