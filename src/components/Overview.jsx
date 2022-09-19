import React, { useState, useEffect } from "react";

import OverviewBoard from "./overview/OverviewBoard";

import calculators from "../accessories/functions/trades";
import assembleOverviewData from "../accessories/functions/overview";
import SearchBox from "./common/SearchBox";

function Overview({ user }) {
  const [overviewData, setOverviewData] = useState([]);
  const [searchValue, setSearchValue] = useState([]);

  useEffect(() => {
    async function fetchHoldings() {
      const holdings = await calculators.getUserHoldings(user.id);
      const overviewData = assembleOverviewData(holdings);
      setOverviewData(overviewData);
    }
    fetchHoldings();
  }, [user]);

  const handleSearchInputChange = (input) => {
    setSearchValue(input.toLowerCase());
  };

  const filterOverviewData = () => {
    let filteredOverviewData = overviewData.filter((i) =>
      i.title.toLowerCase().includes(searchValue)
    );
    return { filteredOverviewData };
  };

  const { filteredOverviewData } = filterOverviewData();

  return (
    <React.Fragment>
      <div className="component">
        <div className="main-container">
          <div className="component-title">
            <h1>overview</h1>
          </div>
          <div className="table-container">
            {filteredOverviewData.length > 0 ? (
              <OverviewBoard data={filteredOverviewData} />
            ) : (
              <p className="main-text">no item match your query</p>
            )}
          </div>
        </div>
        <div className="side-container">
          <div className="corner-button"></div>
          <div className="sidebar">
            <div className="sidebar-content">
              <SearchBox
                onInputChange={handleSearchInputChange}
                placeholder="[ filter parameters ]"
                searboxClass="searchbox"
                id="trade-search"
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Overview;
