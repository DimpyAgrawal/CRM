const Lead = require('../models/Lead');
const { sendNotification } = require('../utils/notifications');

// exports.createLead = async (req, res) => {
//   try {
//     const lead = new Lead(req.body);
//     await lead.save();
    
//     // Send notification if it's a high-value lead
//     if (isHighValueLead(lead)) {
//       await sendNotification('High-value lead created!', lead);
//     }
    
//     res.status(201).json(lead);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.getLeads = async (req, res) => {
//   try {
//     const leads = await Lead.find().populate('campaignId');
//     res.json(leads);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// controllers/leadController.js
exports.getLeads = (req, res) => {
  // Your logic for getting leads
  res.send("Leads retrieved successfully!");
};

exports.createLead = (req, res) => {
  // Your logic for creating a lead
  res.send("Lead created successfully!");
};
