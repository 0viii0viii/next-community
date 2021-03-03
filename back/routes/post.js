//AWS S3 설정
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const { Post } = require('../models');
const { Comment } = require('../models');
const { User } = require('../models');
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
      UserId: req.user.id,
    });
    console.log('하이');
    return res.json(newPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST  /post
// @desc  Edit A Post
router.patch('/:id/edit', uploadS3.none(), async (req, res, next) => {
  try {
    const { title, content, fileUrl, category } = req.body;
    const newPost = await Post.update(
      {
        title,
        content,
        category,
        fileUrl,
      },
      { where: { id: req.params.id } }
    );
    console.log('하이');
    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /post/:id/comment
router.post('/:postId/comment', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    });
    console.log(fullComment);
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// GET /
//@desc 모든 게시글
router.get('/', async (req, res, next) => {
  try {
    const postResult = await Post.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Comment,
          attributes: ['id'],
        },
      ],
    });
    console.log(postResult);
    res.json(postResult);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /myposts/:id
//@desc 내 게시글
router.get('/myposts/:id', async (req, res, next) => {
  try {
    const post = await Post.findAll({
      where: { UserId: req.params.id },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Comment,
          attributes: ['id'],
        },
      ],
    });
    console.log(post, '내가실행됨');
    res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// GET /
//@desc 포스트 디테일
router.get('/detail/:id', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
              order: [['createdAt', 'DESC']],
            },
          ],
        },
      ],
    });
    post.view += 1;
    post.save();
    console.log(post);
    res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE  /post/:postId
//@desc 게시글 삭제
router.delete('/:postId', async (req, res, next) => {
  try {
    await Post.destroy({
      where: { id: req.params.postId, UserId: req.user.id },
    });
    res.json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE  /post/:id
//@desc 게시글 삭제
router.delete('/comment/:id', async (req, res, next) => {
  try {
    await Comment.destroy({
      where: { id: req.params.id },
    });
    res.json();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /post/:postId/score
router.delete('/:postId/score', async (req, res, next) => {
  try {
    await Post.destroy({
      where: { id: req.params.postId, UserId: req.user.id },
    });
    res.json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// category ---------------------------------------------
// GET  /category/free
// @desc  GET Posts 자유게시판
router.get('/free', async (req, res, next) => {
  try {
    const categoryLoadPosts = await Post.findAll({
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'title',
        'content',
        'category',
        'fileUrl',
        'creator',
        'createdAt',
      ],
      where: { category: '자유' },
      include: [
        {
          model: Comment,
          attributes: ['id'],
        },
      ],
    });
    console.log(categoryLoadPosts);
    res.json(categoryLoadPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET  /category/humor
// @desc  GET Posts 유머게시판
router.get('/humor', async (req, res, next) => {
  try {
    const categoryLoadPosts = await Post.findAll({
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'title',
        'content',
        'category',
        'fileUrl',
        'creator',
        'createdAt',
      ],
      where: { category: '유머' },
      include: [
        {
          model: Comment,
          attributes: ['id'],
        },
      ],
    });
    console.log(categoryLoadPosts);
    res.json(categoryLoadPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET  /category/transfer
// @desc  GET Posts 이적시장
router.get('/transfer', async (req, res, next) => {
  try {
    const categoryLoadPosts = await Post.findAll({
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'title',
        'content',
        'category',
        'fileUrl',
        'creator',
        'createdAt',
      ],
      where: { category: '이적시장' },
      include: [
        {
          model: Comment,
          attributes: ['id'],
        },
      ],
    });
    console.log(categoryLoadPosts);
    res.json(categoryLoadPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET  /category/forecast
// @desc  GET Post forecast
router.get('/forecast', async (req, res, next) => {
  try {
    const categoryLoadPosts = await Post.findAll({
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'title',
        'content',
        'category',
        'fileUrl',
        'creator',
        'createdAt',
      ],
      where: { category: '경기예측' },
      include: [
        {
          model: Comment,
          attributes: ['id'],
        },
      ],
    });
    console.log(categoryLoadPosts);
    res.json(categoryLoadPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET  /category/examine
// @desc  GET Post examine
router.get('/examine', async (req, res, next) => {
  try {
    const categoryLoadPosts = await Post.findAll({
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'title',
        'content',
        'category',
        'fileUrl',
        'creator',
        'createdAt',
      ],
      where: { category: '경기분석' },
      include: [
        {
          model: Comment,
          attributes: ['id'],
        },
      ],
    });
    console.log(categoryLoadPosts);
    res.json(categoryLoadPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET  /category/debate
// @desc  GET Post debate
router.get('/debate', async (req, res, next) => {
  try {
    const categoryLoadPosts = await Post.findAll({
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'title',
        'content',
        'category',
        'fileUrl',
        'creator',
        'createdAt',
      ],
      where: { category: '경기토론' },
      include: [
        {
          model: Comment,
          attributes: ['id'],
        },
      ],
    });
    console.log(categoryLoadPosts);
    res.json(categoryLoadPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//-------category------------

module.exports = router;
