const express = require('express');
const { Post } = require('../models');
const { Comment } = require('../models');
const { User } = require('../models');
const router = express.Router();

// category ---------------------------------------------
// GET  /category/free
// @desc  GET Posts 자유게시판
router.get('/free', async (req, res, next) => {
  const curPage = req.query.page || 1;
  const perPage = 20;
  try {
    const freePosts = await Post.findAll({
      offset: (curPage - 1) * perPage,
      limit: perPage,
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
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    const totalPosts = await Post.count({ where: { category: '자유' } });
    console.log(freePosts);
    console.log(totalPosts);
    res.status(200).json({
      message: 'Fetched posts',
      posts: freePosts,
      curPage: curPage,
      maxPage: Math.ceil(totalPosts / perPage),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET  /category/humor
// @desc  GET Posts 유머게시판
router.get('/humor', async (req, res, next) => {
  const curPage = req.query.page || 1;
  const perPage = 20;
  try {
    const humorPosts = await Post.findAll({
      offset: (curPage - 1) * perPage,
      limit: perPage,
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
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    const totalPosts = await Post.count({ where: { category: '유머' } });
    console.log(humorPosts);
    console.log(totalPosts);
    res.status(200).json({
      message: 'Fetched posts',
      posts: humorPosts,
      curPage: curPage,
      maxPage: Math.ceil(totalPosts / perPage),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET  /category/transfer
// @desc  GET Posts 이적시장
router.get('/transfer', async (req, res, next) => {
  const curPage = req.query.page || 1;
  const perPage = 20;
  try {
    const transferPosts = await Post.findAll({
      offset: (curPage - 1) * perPage,
      limit: perPage,
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
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    const totalPosts = await Post.count({ where: { category: '이적시장' } });
    console.log(transferPosts);
    console.log(totalPosts);
    res.status(200).json({
      message: 'Fetched posts',
      posts: transferPosts,
      curPage: curPage,
      maxPage: Math.ceil(totalPosts / perPage),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET  /category/forecast
// @desc  GET Post forecast
router.get('/forecast', async (req, res, next) => {
  const curPage = req.query.page || 1;
  const perPage = 20;
  try {
    const forecastPosts = await Post.findAll({
      offset: (curPage - 1) * perPage,
      limit: perPage,
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
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    const totalPosts = await Post.count({ where: { category: '경기예측' } });
    console.log(forecastPosts);
    console.log(totalPosts);
    res.status(200).json({
      message: 'Fetched posts',
      posts: forecastPosts,
      curPage: curPage,
      maxPage: Math.ceil(totalPosts / perPage),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET  /category/examine
// @desc  GET Post examine
router.get('/examine', async (req, res, next) => {
  const curPage = req.query.page || 1;
  const perPage = 20;
  try {
    const examinePosts = await Post.findAll({
      offset: (curPage - 1) * perPage,
      limit: perPage,
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
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    const totalPosts = await Post.count({ where: { category: '경기분석' } });
    console.log(examinePosts);
    console.log(totalPosts);
    res.status(200).json({
      message: 'Fetched posts',
      posts: examinePosts,
      curPage: curPage,
      maxPage: Math.ceil(totalPosts / perPage),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET  /category/debate
// @desc  GET Post debate
router.get('/debate', async (req, res, next) => {
  const curPage = req.query.page || 1;
  const perPage = 20;
  try {
    const debatePosts = await Post.findAll({
      offset: (curPage - 1) * perPage,
      limit: perPage,
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
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    const totalPosts = await Post.count({ where: { category: '경기토론' } });
    console.log(debatePosts);
    console.log(totalPosts);
    res.status(200).json({
      message: 'Fetched posts',
      posts: debatePosts,
      curPage: curPage,
      maxPage: Math.ceil(totalPosts / perPage),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
