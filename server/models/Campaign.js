const { default: mongoose } = require("mongoose");


const campaignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: String,
    startDate: Date,
    endDate: Date,
    budget: Number,
    status: {
        type: String,
        enum: ['active', 'paused', 'completed'],
        default: 'active'
    },
    metrics: {
        impressions: { type: Number, default: 0 },
        clicks: { type: Number, default: 0 },
        conversions: { type: Number, default: 0 }
    }
});

module.exports = mongoose.model('Campaign', campaignSchema);