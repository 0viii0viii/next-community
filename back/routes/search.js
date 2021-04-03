const express = require('express');
const { Post } = require('../models');
const { User } = require('../models');
const { Comment } = require('../models');

const { Op } = require('sequelize');

const router = express.Router();
/// GET /search/:search
router.get('/:id', async (req, res, next) => {
  const curPage = req.query.page || 1;
  const perPage = 10;
  try {
    const searchResult = await Post.findAll({
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
      where: { title: { [Op.like]: '%' + req.params.id + '%' } },
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
    const totalPosts = await Post.count({
      where: { title: { [Op.like]: '%' + req.params.id + '%' } },
    });
    console.log();
    res.status(200).json({
      message: 'Fetched posts',
      posts: searchResult,
      curPage: curPage,
      maxPage: Math.ceil(totalPosts / perPage),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
