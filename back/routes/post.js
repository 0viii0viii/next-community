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
    console.log(req.params.id, '파람스');
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
router.get('/all', async (req, res, next) => {
  const curPage = req.query.page || 1;
  const perPage = 10;
  console.log(curPage, '컬페이지');
  try {
    const posts = await Post.findAll({
      offset: (curPage - 1) * perPage,
      limit: perPage,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Comment,
          attributes: ['id'],
        },
      ],
    });
    const totalPosts = await Post.count();
    console.log(posts);
    console.log(totalPosts);
    res.status(200).json({
      message: 'Fetched posts',
      posts: posts,
      curPage: curPage,
      maxPage: Math.ceil(totalPosts / perPage),
    });
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
    res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// GET /myposts/:id
//@desc 내 게시글
router.get('/test', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: 40 },
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

module.exports = router;
