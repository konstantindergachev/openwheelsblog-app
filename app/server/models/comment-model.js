const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const symbols = 250;
const validateText = (str) => {
  return str.length < symbols;
};

const CommentPostSchema = new Schema({
  // text: { type: String, default: "Продолжайте...", trim: true, validate: validateText },
  text: {
    type: String,
    default: 'Продолжайте...',
    trim: true,
  },
  post: {
    type: ObjectId,
    index: true,
  },
  author: {
    type: String,
    default: 'Джон Доу',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//commentPostSchema.set('autoIndex', false);    <-в production мы отключаем создание авто индекса
module.exports = Comment = mongoose.model('comments', CommentPostSchema);
