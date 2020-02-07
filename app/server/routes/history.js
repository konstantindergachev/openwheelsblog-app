const express = require('express');
const router = express.Router();
const History = require('../models/history-model');
const BlogPost = require('../models/post-model');
const limitText = require('../helpers/calc-text-length');

const getHistoryPage = async (req, res) => {
  try {
    const data = await History.find();
    const {
      image1,
      image2,
      image3,
      image4,
      image5,
      image6,
      image7,
      image8,
      image9,
      title,
      author,
      paragraph1,
      paragraph2,
      paragraph3,
      paragraph4,
      paragraph5,
      paragraph6,
      paragraph7,
      paragraph8,
      paragraph9,
      paragraph10,
      paragraph11,
      paragraph12,
      paragraph13,
      paragraph14,
      paragraph15,
      paragraph16,
      paragraph17,
      paragraph18,
      paragraph19,
      paragraph20,
      paragraph21,
      paragraph22,
      paragraph23,
      paragraph24,
      paragraph25,
      paragraph26,
      paragraph27,
      paragraph28,
      paragraph29,
      paragraph30,
    } = data[0];

    const sideBarPosts = await BlogPost.find().sort({ text: -1 }).limit(20);

    sideBarPosts.map((blog) => {
      const { text } = blog;
      return (blog.text = limitText(text));
    });

    res.render('history', {
      pageTitle: 'История гонок',
      pageID: 'history',
      image1,
      image2,
      image3,
      image4,
      image5,
      image6,
      image7,
      image8,
      image9,
      title,
      author,
      paragraph1,
      paragraph2,
      paragraph3,
      paragraph4,
      paragraph5,
      paragraph6,
      paragraph7,
      paragraph8,
      paragraph9,
      paragraph10,
      paragraph11,
      paragraph12,
      paragraph13,
      paragraph14,
      paragraph15,
      paragraph16,
      paragraph17,
      paragraph18,
      paragraph19,
      paragraph20,
      paragraph21,
      paragraph22,
      paragraph23,
      paragraph24,
      paragraph25,
      paragraph26,
      paragraph27,
      paragraph28,
      paragraph29,
      paragraph30,
      posts: sideBarPosts,
    });
  } catch (err) {
    console.log(
      'Ошибка получения исторической летописи о гонках на открытых колесах: ',
      err
    );
  }
};
router.get('/history', getHistoryPage);
module.exports = router;
