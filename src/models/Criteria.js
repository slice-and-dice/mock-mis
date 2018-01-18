const mongoose = require('mongoose');

const { Schema } = mongoose;

const criteriaSchema = new Schema({
  riskType: String,
  riskValues: [{ value: Number, options: [String] }]
});

module.exports = mongoose.model('criteria', criteriaSchema);