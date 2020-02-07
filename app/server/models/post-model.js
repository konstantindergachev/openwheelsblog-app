const mongoose = require('mongoose');
const lifecycle = require('mongoose-lifecycle');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  user: {
    type: String,
    ref: 'User',
  },
  title: {
    type: String,
    trim: true,
    default: 'Твин Пикс. Сезон 3.',
    index: true,
  },
  text: { type: String },
  photo: {
    type: String,
    trim: true,
    default:
      'https://res.cloudinary.com/dqczxo6fq/image/upload/v1580919117/S.jpg',
  },
  photoId: {
    type: String,
    trim: true,
    default: 'liykshlziz1hucwrim3c',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = BlogPost = mongoose.model('posts', BlogPostSchema);

BlogPostSchema.plugin(lifecycle);
