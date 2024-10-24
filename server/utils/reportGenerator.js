const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');

exports.generatePDFReport = (data, res) => {
  const doc = new PDFDocument();
  doc.pipe(res);
  
  doc.fontSize(25).text('Lead Report', 100, 100);
  data.forEach((item, index) => {
    doc.fontSize(12).text(`${item.name} - ${item.email}`, 100, 150 + index * 20);
  });
  
  doc.end();
};

exports.generateCSVReport = (data, res) => {
  const fields = ['name', 'email', 'status', 'source', 'createdAt'];
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(data);
  
  res.header('Content-Type', 'text/csv');
  res.attachment('lead-report.csv');
  return res.send(csv);
};