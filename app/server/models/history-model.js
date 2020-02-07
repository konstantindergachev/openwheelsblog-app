const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema(
  {
    image1: { type: String, index: true },
    image2: { type: String, index: true },
    image3: { type: String, index: true },
    image4: { type: String, index: true },
    image5: { type: String, index: true },
    image6: { type: String, index: true },
    image7: { type: String, index: true },
    image8: { type: String, index: true },
    image9: { type: String, index: true },
    title: { type: String },
    author: { type: String },
    paragraph1: { type: String },
    paragraph2: { type: String },
    paragraph3: { type: String },
    paragraph4: { type: String },
    paragraph5: { type: String },
    paragraph6: { type: String },
    paragraph7: { type: String },
    paragraph8: { type: String },
    paragraph9: { type: String },
    paragraph10: { type: String },
    paragraph11: { type: String },
    paragraph12: { type: String },
    paragraph13: { type: String },
    paragraph14: { type: String },
    paragraph15: { type: String },
    paragraph16: { type: String },
    paragraph17: { type: String },
    paragraph18: { type: String },
    paragraph19: { type: String },
    paragraph20: { type: String },
    paragraph21: { type: String },
    paragraph22: { type: String },
    paragraph23: { type: String },
    paragraph24: { type: String },
    paragraph25: { type: String },
    paragraph26: { type: String },
    paragraph27: { type: String },
    paragraph28: { type: String },
    paragraph29: { type: String },
    paragraph30: { type: String },
  },
  { versionKey: false }
);

module.exports = History = mongoose.model('histories', HistorySchema);
module.exports.createHistory = (newHistory, callback) => {
  newHistory.save(callback);
};
