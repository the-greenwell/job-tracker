var mongoose = require('mongoose');

var JobsSchema = new mongoose.Schema({
  company: String,
  position: String,
  status: String,
  link: String,
  starred: { type: Boolean, default: false },
});

module.exports = mongoose.model('Jobs', JobsSchema);
