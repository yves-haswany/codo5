exports.handler = async (event) => {
  const invoiceBytes = await generateInvoice(billingData);
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/pdf" },
    body: invoiceBytes.toString("base64"),
    isBase64Encoded: true,
  };
};
