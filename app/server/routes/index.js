const express = require('express');
const router = express.Router();
const BlogPost = require('../models/post-model');
const banner = require('../../data/motorsport.json');
const limitText = require('../helpers/calc-text-length');
const { dateFormat, timeFormat } = require('../helpers/dateFormat');

const getBlogs = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 3;
  const skip = page * limit - limit;

  try {
    const blogPostPromise = BlogPost.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const blogPostCount = BlogPost.countDocuments();
    const [ blogs, count ] = await Promise.all([
      blogPostPromise,
      blogPostCount,
    ]);

    const dateAndTime = [];
    const updBlogs = blogs.map((blog) => {
      const { text } = blog;
      blog.text = limitText(text);
      dateAndTime.push({
        date: dateFormat(blog.createdAt),
        time: timeFormat(blog.createdAt),
      });
      return blog;
    });

    const pages = Math.ceil(count / limit);
    if (!blogs.length && skip) {
      res.redirect(`/blogs/page/${pages}`);
      return;
    }

    const newsForSidebar = banner.slice(0, 3);
    res.render('index', {
      pageTitle: 'Главная',
      pageID: 'index',
      posts: updBlogs,
      dateAndTime,
      page,
      pages,
      count,
      banner,
      newsForSidebar,
    });
  } catch (err) {
    console.log('Ошибка получения главной страницы: ', err);
  }
};

router.get('/', getBlogs);
router.get('/blogs', getBlogs);
router.get('/blogs/page/:page', getBlogs);

module.exports = router;
