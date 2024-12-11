const calculateBilling = (reads, cdr) => {
  const totalKwh = reads.reduce((sum, read) => sum + read.kWh, 0);
  const cost = totalKwh * cdr.rate;
  return { totalKwh, cost };
};
