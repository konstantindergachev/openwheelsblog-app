const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutSchema = new Schema({
  image: { type: String, index: true },
  title: { type: String },
  subtitle: { type: String },
  paragraph1: { type: String },
  paragraph2: { type: String },
  paragraph3: { type: String },
  paragraph4: { type: String },
  paragraph5: { type: String },
  blockquote1: { type: String },
  blockquote2: { type: String },
});

module.exports = About = mongoose.model('abouts', AboutSchema);
module.exports.createAbout = (newAbout, callback) => {
  newAbout.save(callback);
};
