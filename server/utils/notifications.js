const nodemailer = require('nodemailer');

class NotificationService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendLeadNotification(lead) {
    if (this.isHighValueLead(lead)) {
      await this.sendEmail({
        subject: 'High-Value Lead Alert',
        template: 'highValueLead',
        data: lead
      });
    }
  }

  async sendCampaignAlert(campaign) {
    if (this.needsCampaignAlert(campaign)) {
      await this.sendEmail({
        subject: 'Campaign Performance Alert',
        template: 'campaignAlert',
        data: campaign
      });
    }
  }

  async sendEmail({ subject, template, data }) {
    const html = await this.generateEmailTemplate(template, data);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject,
      html
    };

    await this.transporter.sendMail(mailOptions);
  }

  isHighValueLead(lead) {
    // Define high-value lead criteria
    return lead.status === 'qualified' || lead.source === 'referral';
  }

  needsCampaignAlert(campaign) {
    const conversionRate = ETLService.calculateConversionRate(campaign);
    return conversionRate < 1 || campaign.metrics.clicks === 0;
  }

  async generateEmailTemplate(template, data) {
    // Simple template system
    const templates = {
      highValueLead: `
        <h2>New High-Value Lead</h2>
        <p>Name: ${data.name}</p>
        <p>Email: ${data.email}</p>
        <p>Status: ${data.status}</p>
        <p>Source: ${data.source}</p>
      `,
      campaignAlert: `
        <h2>Campaign Alert</h2>
        <p>Campaign: ${data.name}</p>
        <p>Status: ${data.status}</p>
        <p>Conversion Rate: ${ETLService.calculateConversionRate(data)}%</p>
        <p>Click-through Rate: ${ETLService.calculateCTR(data)}%</p>
      `
    };
    return templates[template];
  }
}