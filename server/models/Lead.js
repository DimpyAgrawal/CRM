const { default: mongoose } = require("mongoose");


const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'converted'],
      default: 'new'
    },
    source: String,
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  
module.exports = mongoose.model('Lead', leadSchema);