const mongoose = require('mongoose');

const { Schema } = mongoose;

const criteriaSchema = new Schema({
  riskType: String,
  riskValue: Number,
});

module.exports = mongoose.model('criteria', criteriaSchema);