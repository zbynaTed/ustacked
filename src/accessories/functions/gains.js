function calculateGainsParameters(gainsData) {
  const gains = [];

  for (let item of gainsData) {
    const holding = Object.values(item)[0];
    if (holding.realizedGain) {
      holding.realizedGain = Math.round(holding.realizedGain * 100) / 100;
      holding.netGain =
        Math.round((holding.realizedGain - holding.realizedFees) * 100) / 100;
      holding.profitRate =
        holding.positionStatus === 4
          ? Math.round(
              (holding.netGain /
                (holding.totalBuyAmount + holding.realizedFees)) *
                10000
            ) / 100
          : null;
      gains.push(holding);
    }
  }
  return gains;
}

export default calculateGainsParameters;
