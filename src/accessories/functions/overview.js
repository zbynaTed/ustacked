import overviewItems from "../../accessories/constants/overviewItems";

const assembleOverviewData = (holdings) => {
  const overviewData = [];
  for (let item of overviewItems) {
    let sum = 0;
    let count = 0;
    let largest = {};
    for (let h of holdings) {
      largest.parameter = largest.parameter || h[item.parameter];
      largest.value = largest.value || item.content(h);

      switch (item.agregateType) {
        case "sum":
          sum = sum += item.content(h);
        case "count":
          count = item.content(h) ? count + 1 : count;
        case "largest":
          if (item.direction > 0) {
            if (item.content(h) > largest.value) {
              largest.value = item.content(h);
              largest.parameter = h[item.parameter];
            }
          } else {
            if (item.content(h) > 0 && item.content(h) < largest.value) {
              largest.value = item.content(h);
              largest.parameter = h[item.parameter];
            }
          }
      }
    }

    overviewData.push({
      id: item.id,
      title: item.title,
      value: sum || count || largest.parameter,
      currencyItem: item.currencyItem,
      dateItem: item.dateItem,
    });
  }
  return overviewData;
};

export default assembleOverviewData;
