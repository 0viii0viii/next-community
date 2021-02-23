const express = require('express');
const { Post } = require('../models');
const { Comment } = require('../models');

const { Op } = require('sequelize');

const router = express.Router();
/// GET /search/:search
router.get('/:id', async (req, res, next) => {
  console.log(req.params.id);
  try {
    const searchResult = await Post.findAll({
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
      ],
    });
    console.log(searchResult);
    res.json(searchResult);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
