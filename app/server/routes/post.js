const express = require('express');
const router = express.Router();
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');
const BlogPost = require('../models/post-model');
const Comment = require('../models/comment-model');
const banner = require('../../data/motorsport.json');
const localUrl = require('../config/config').localUrl;
const { cloud_name, api_key, api_secret } = require('../config/config');
const { dateFormat, timeFormat } = require('../helpers/dateFormat');

cloudinary.config({ cloud_name, api_key, api_secret });
const objectId = require('mongodb').ObjectID;

const newsForSidebar = banner.slice(0, 3);

const getNewPost = async (req, res) => {
  try {
    const record = await BlogPost.find();
    res.render('post', {
      pageTitle: 'Создание записи',
      pageID: 'create__record',
      record,
    });
  } catch (err) {
    console.log('Ошибка получения нового поста: ', err);
  }
};
router.get('/post/create', getNewPost);

router.use(fileUpload());
const createPost = async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const {
    user: { _id: id },
    user: { username: user },
    body: { title },
    body: { text },
  } = req;
  const uploadFile = req.files.photo;
  const fileName = req.files.photo.name;
  console.log(fileName);
  try {
    await uploadFile.mv(`${localUrl}${fileName}`);
    const result = await cloudinary.uploader.upload(`${localUrl}${fileName}`);
    await new BlogPost({
      id,
      user,
      title,
      text,
      photo: result.secure_url,
      photoId: result.public_id,
    }).save();
    fs.unlink(`${localUrl}${fileName}`, function(err) {
      if (err) console.log('Ошибка удаления файла для создания поста: ', err);
      console.log('Временный файл успешно удалён');
    });
    res.redirect(`/`);
  } catch (err) {
    console.log('Ошибка создания нового поста: ', err);
  }
};
router.post('/post/create', createPost);

const getOnePost = async (req, res) => {
  try {
    const id = new objectId(req.params.id);
    const arrayOfComments = Comment.find({ post: id })
      .sort('createdAt')
      .select('-_id');
    const getAuthor = BlogPost.findById(id).populate('author');
    const [ comments, author ] = await Promise.all([
      arrayOfComments,
      getAuthor,
    ]);

    const dateAndTimeOfComments = [];
    comments.map((comment) => {
      if (comment.createdAt) {
        dateAndTimeOfComments.push({
          date: dateFormat(comment.createdAt),
          time: timeFormat(comment.createdAt),
        });
      }
      return comment;
    });

    res.render('post', {
      pageTitle: 'Запись',
      pageID: 'record',
      post: author,
      date: dateFormat(author.createdAt),
      time: timeFormat(author.createdAt),
      banner,
      newsForSidebar,
      comments,
      dateAndTimeOfComments,
    });
  } catch (err) {
    console.log('Ошибка получения одного поста: ', err);
  }
};
router.get('/post/:id', getOnePost);

const getEditPostPage = async (req, res) => {
  try {
    const id = new objectId(req.params.id);
    const onePost = BlogPost.findOne({ _id: id });
    const arrayOfComments = Comment.find({ post: id })
      .sort('createdAt')
      .select('-_id');
    const [ post, comments ] = await Promise.all([ onePost, arrayOfComments ]);

    const dateAndTimeOfComments = [];
    comments.map((comment) => {
      if (comment.createdAt) {
        dateAndTimeOfComments.push({
          date: dateFormat(comment.createdAt),
          time: timeFormat(comment.createdAt),
        });
      }
      return comment;
    });

    res.render('post', {
      pageTitle: 'Редактировать',
      pageID: 'edit',
      post,
      date: dateFormat(post.createdAt),
      time: timeFormat(post.createdAt),
      newsForSidebar,
      comments,
      dateAndTimeOfComments,
    });
  } catch (err) {
    console.log('Ошибка получения одного поста: ', err);
  }
};
router.get('/post/edit/:id', getEditPostPage);

const editPost = async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const { user: { username: user }, body: { title }, body: { text } } = req;
  if (req.files) {
    try {
      const record = await BlogPost.findById(req.params.id);
      await cloudinary.uploader.destroy(record.photoId);
      const uploadFile = req.files.photo;
      const fileName = req.files.photo.name;
      await uploadFile.mv(`${localUrl}${fileName}`);
      const result = await cloudinary.uploader.upload(`${localUrl}${fileName}`);
      const newData = {
        user,
        title,
        text,
        photo: result.secure_url,
        photoId: result.public_id,
        createdAt: new Date(),
      };
      const id = new objectId(req.params.id);
      await BlogPost.findByIdAndUpdate(id, { $set: newData }, { new: true });
      res.redirect(`/`);
    } catch (err) {
      req.flash(
        'error_msg',
        'Система не поддурживает публикацию Gif-файлов. Пожалуйста, выберите другой формат.'
      );
      res.redirect('back');
    }
  }
};
router.post('/post/edit/:id', editPost);

const removePost = async (req, res) => {
  try {
    const onePostToRemove = await BlogPost.findById(req.params.id);
    await cloudinary.uploader.destroy(onePostToRemove.photoId);
    if (onePostToRemove.user !== req.user.username)
      res.status(403).send(`Чужие записи удалять нехорошо!`);
    onePostToRemove.remove();
    await Comment.deleteMany({ post: req.params.id });
    res.redirect('/');
  } catch (err) {
    console.log(`Ошибка удаления поста: `, err);
    res.redirect('back');
  }
};
router.get('/post/remove/:id', removePost);

const commentCreate = async (req, res) => {
  const { params: { id }, user: { username }, body: { text } } = req;
  try {
    await Comment.create({ post: id, text, author: username });
    res.redirect(`/`);
  } catch (err) {
    console.log('Ошибка создания комментария: ', err);
  }
};
router.post('/post/comment/:id', commentCreate);

module.exports = router;
