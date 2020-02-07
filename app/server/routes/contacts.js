const express = require('express');
const router = express.Router();
const mapApiKey = require('../config/config').mapApiKey;

router.get('/contact', (req, res) => {
  res.render('contact', {
    pageTitle: 'Контакты',
    pageID: 'contact',
    MAP_API_KEY: mapApiKey,
  });
});

module.exports = router;
