const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Вы вышли');
  res.redirect('/');
});

module.exports = router;
