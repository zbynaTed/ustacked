export default function pickUserCorporateActions(tradeList) {
  let userCorporateActions = [];
  let caIdsList = [];
  console.log(tradeList);

  for (let t of tradeList) {
    let stockTrades = Object.values(t)[0];

    for (let trade = stockTrades.length; trade--; trade >= 0) {
      let caList = stockTrades[trade].corporateActions;

      if (caList.length > 0) {
        for (let ca of caList) {
          if (!caIdsList.includes(ca.id)) {
            caIdsList.push(ca.id);
            const corporateAction = stockTrades[trade].corporateActions.filter(
              (c) => c.id === ca.id
            )[0];
            corporateAction.companyName = stockTrades[trade].name;
            corporateAction.balanceAdjusted =
              stockTrades[trade].balanceAdjusted;
            corporateAction.quantityAdjusted =
              stockTrades[trade].quantityAdjusted;
            userCorporateActions.push(corporateAction);
          }
        }
      }
    }
  }
  return userCorporateActions;
}
