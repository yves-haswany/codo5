const { PDFDocument } = require('pdf-lib');

const generateInvoice = async (billingData) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  page.drawText(Invoice: Total kWh: ${billingData.totalKwh}, Cost: ${billingData.cost});
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
