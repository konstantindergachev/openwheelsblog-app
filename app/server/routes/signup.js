const express = require('express');
const router = express.Router();
const User = require('../models/user-model');

router.get('/signup', (req, res) => {
  res.render('signup', {
    pageTitle: 'Регистрация',
    pageID: 'signup',
  });
});

router.post('/signup', async (req, res) => {
  const { body: { username }, body: { email }, body: { password } } = req;

  req.checkBody('username', 'Требуется имя').notEmpty();
  req.checkBody('email', 'Требуется email').notEmpty();
  req.checkBody('password', 'Требуется пароль').notEmpty();

  const err = req.validationErrors();
  if (err) {
    res.render('signup', { err });
  } else {
    const newUser = new User({ username, email, password });
    try {
      await User.createUser(newUser);
      res.redirect('/login');
    } catch (err) {
      console.log('Ошибка создания пользователя: ', err);
      req.flash('error_msg', 'Ошибка. Повторите процедуру регистрации');
    }
  }
});

module.exports = router;
