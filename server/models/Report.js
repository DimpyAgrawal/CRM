const { default: mongoose } = require("mongoose");

const reportSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['lead', 'campaign', 'performance'],
      required: true
    },
    dateGenerated: {
      type: Date,
      default: Date.now
    },
    filters: Object,
    data: Object,
    format: {
      type: String,
      enum: ['pdf', 'csv'],
      required: true
    }
  });
  
  module.exports = mongoose.model('Report', reportSchema);