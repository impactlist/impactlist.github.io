// Function to parse dollar amounts
function parseDollarAmount(value) {
  const numericValue = parseFloat(value.replace(/[$,]/g, ""));
  if (value.includes('B')) return numericValue * 1e9;
  if (value.includes('M')) return numericValue * 1e6;
  if (value.includes('K')) return numericValue * 1e3;
  return numericValue;
}