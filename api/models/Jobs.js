var mongoose = require('mongoose');

var JobsSchema = new mongoose.Schema({
  company: String,
  position: String,
  status: String,
  link: String,
  notes: String,
  starred: {
    type: Boolean, default: false
  },
},{
  timestamps:true
});

module.exports = mongoose.model('Jobs', JobsSchema);
