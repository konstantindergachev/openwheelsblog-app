const express = require('express');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const mongoose = require('mongoose');
const db = require('./server/config/config_dev').herokuDepl;

const { localPort } = require('./server/config/config_dev');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

mongoose.connect(db, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, './public')));

app.use(
  session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  expressValidator({
    errorFormatter(param, msg, value) {
      let namespace = param.split('.');
      let root = namespace.shift();
      let formParam = root;

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param: formParam,
        msg,
        value,
      };
    },
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;

  next();
});

app.use(require('./server/routes/index'));
app.use(require('./server/routes/about'));
app.use(require('./server/routes/history'));
app.use(require('./server/routes/contacts'));
app.use(require('./server/routes/login'));
app.use(require('./server/routes/signup'));
app.use(require('./server/routes/logout'));
app.use(require('./server/routes/post'));
/*---------- Nodemailer start ----------*/
app.use(require('./server/routes/send'));
app.use(require('./server/routes/thanks'));
/*---------- Nodemailer end ----------*/
app.use(require('./server/routes/error'));

const port = process.env.PORT || localPort;
app.listen(port, () =>
  console.log('Сервер ожидает подключения по порту ', port)
);
