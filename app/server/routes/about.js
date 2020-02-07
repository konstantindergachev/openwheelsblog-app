const express = require('express');
const router = express.Router();
const About = require('../models/about-model');
const BlogPost = require('../models/post-model');
const limitText = require('../helpers/calc-text-length');

const getAboutPage = async (req, res) => {
  try {
    const data = await About.find();
    const {
      image,
      title,
      subtitle,
      paragraph1,
      paragraph2,
      paragraph3,
      paragraph4,
      paragraph5,
      blockquote1,
      blockquote2,
    } = data[0];

    const sideBarPosts = await BlogPost.find().sort({ text: -1 }).limit(20);

    sideBarPosts.map((blog) => {
      const { text } = blog;
      blog.text = limitText(text);
    });

    res.render('about', {
      pageTitle: 'О формуле 1',
      pageID: 'about',
      image,
      title,
      subtitle,
      paragraph1,
      paragraph2,
      paragraph3,
      paragraph4,
      paragraph5,
      blockquote1,
      blockquote2,
      posts: sideBarPosts,
    });
  } catch (err) {
    console.log('Ошибка получения поста для страницы о формуле 1: ', err);
  }
};
router.get('/about', getAboutPage);

module.exports = router;
