function computeRanks(data) {
  // Function to parse dollar amounts
  function parseDollarAmount(value) {
    const numericValue = parseFloat(value.replace(/[$,]/g, ""));
    if (value.includes('B')) return numericValue * 1e9;
    if (value.includes('M')) return numericValue * 1e6;
    if (value.includes('K')) return numericValue * 1e3;
    return numericValue;
  }

  // Sort data by impact
  data.sort((a, b) => parseDollarAmount(b.impact) - parseDollarAmount(a.impact));

  // Assign ranks with tie handling
  let previousRank = 0;
  let previousImpact = Infinity;
  let tieCount = 0;

  data.forEach((person, index) => {
    const personImpact = parseDollarAmount(person.impact);
    if (personImpact < previousImpact) {
      person.rank = previousRank + tieCount + 1;
      previousImpact = personImpact;
      previousRank = person.rank;
      tieCount = 0;
    } else if (personImpact === previousImpact) {
      person.rank = previousRank;
      tieCount++;
    } else if (personImpact > previousImpact) {
      throw new Error("Person impact is greater than previous impact");
    }
  });

  return data;
}