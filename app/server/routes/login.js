const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user-model');

router.get('/login', (req, res) => {
  req.flash('success_msg', 'Вы зарегистрированы и можете войти');
  res.render('login', {
    pageTitle: 'Логин',
    pageID: 'login',
  });
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        done(null, false, { message: 'Неизвестный пользователь' });
      }
      const isMatch = await User.comparePassword(password, user.password);
      if (!isMatch) {
        done(null, false, { message: 'Неверный пароль' });
      }
      done(null, user);
    } catch (err) {
      done(null, false, { message: 'Oops!' });
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }),
  (res) => {
    res.redirect('/');
  }
);

module.exports = router;
