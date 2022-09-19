function calculateHoldingsParameters(holdingsData) {
  const currentHoldings = [];
  const pastHoldings = [];
  let totalAmount = 0;

  for (let h of holdingsData) {
    const holding = Object.values(h)[0];

    if (holding.balanceAdjusted !== 0) {
      totalAmount += Math.abs(holding.balanceAdjusted) * holding.closePrice;
      currentHoldings.push(holding);
    } else pastHoldings.push(holding);
  }

  for (let holding of currentHoldings) {
    holding.value = holding.balanceAdjusted * holding.closePrice;
    holding.gain = holding.balanceAdjusted * (holding.closePrice - holding.averageBuy);
    holding.gainRate = holding.gain / (holding.averageBuy * holding.balanceAdjusted);
    holding.share = holding.value / totalAmount;
    holding.toBreakEven =
      holding.gain > 0
        ? null
        : Math.round((1 / ((100 + holding.gain) / 100) - 1) * 100);
  }

  for (let holding of pastHoldings) {
    holding.value = null;
    holding.share = null;
    holding.gainRate = holding.realizedGain / holding.totalBuyAmount;
  }

  return { currentHoldings, pastHoldings };
}

export default calculateHoldingsParameters;
