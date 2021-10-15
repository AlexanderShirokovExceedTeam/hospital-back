const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const visitSchema = new Schema({
  patient:  {type: String,  required: true},
  doctor:   {type: String,  required: true},
  date:     {type: Date,    required: true},
  problem:  {type: String,  required: true},
  userId:   {type: String,  required: true}
});

module.exports = Visit = mongoose.model('visits', visitSchema);
