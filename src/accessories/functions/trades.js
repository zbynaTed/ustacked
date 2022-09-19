import {
  getCurrentHoldings,
  getHoldingsHistory,
} from "../../services/api/holdings";

async function getUserHoldings(userId) {
  try {
    let holdings = [];
    const { data: holdingsData } = await getCurrentHoldings(userId);

    for (let item of holdingsData) {
      const holding = Object.values(item)[0];
      holdings.push(holding);
    }

    return holdings;
  } catch (error) {
    console.log(error.message);
  }
}

async function getUserTrades(userId) {
  try {
    let trades = [];
    const { data: tradesData } = await getHoldingsHistory(userId);

    for (let item of tradesData) {
      const stock = Object.values(item)[0];
      for (let trade of stock) {
        trades.push(trade);
      }
    }

    return trades;
  } catch (error) {
    console.log(error.message);
  }
}

const calculators = {
  getUserHoldings,
  getUserTrades,
};

export default calculators;
