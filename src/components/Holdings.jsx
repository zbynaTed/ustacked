import React, { useState, useEffect } from "react";
import _ from "lodash";

import HoldingsTable from "./holdings/HoldingsTable";
import Pagination from "./common/Pagination";
import SearchBox from "./common/SearchBox";
// import SidebarFooter from "./sidebar/SidebarFooter";

import { getCurrentHoldings } from "../services/api/holdings";
import calculateHoldingsParameters from "../accessories/functions/holdings";
import HoldingsTypeSwitch from "./holdings/HoldingsTypeSwitch";

function Holdings({ user }) {
  const [currentHoldings, setCurrentHoldings] = useState([]);
  const [pastHoldings, setPastHoldings] = useState([]);
  const [currentToggle, setCurrentToggle] = useState(true);
  const [pastToggle, setPastToggle] = useState(false);
  const [searchValue, setSearchValue] = useState([]);
  const [pageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortColumn, setSortColumn] = useState({
    path: "symbol",
    asc: true,
  });

  useEffect(() => {
    const fetchHoldings = async () => {
      const { data } = await getCurrentHoldings(user.id);
      const { currentHoldings, pastHoldings } =
        calculateHoldingsParameters(data);
      setCurrentHoldings(currentHoldings);
      setPastHoldings(pastHoldings);
    };
    fetchHoldings();
  }, [user.id]);

  const handleSearchInputChange = (input) => {
    setCurrentPage(0);
    setSearchValue(input);
  };

  const handleSwitchCurrentHoldings = () => {
    setCurrentToggle(!currentToggle);
  };

  const handleSwitchPastHoldings = () => {
    setPastToggle(!pastToggle);
  };

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const filterHoldings = () => {
    let displayedHoldings = [];
    let currentPart = currentToggle ? currentHoldings : null;
    let pastPart = pastToggle ? pastHoldings : null;
    let selectedHoldings = [currentPart, pastPart];
    for (let sel of selectedHoldings) {
      if (sel) {
        for (let h of sel) {
          displayedHoldings.push(h);
        }
      }
    }

    const filteredHoldings = displayedHoldings.filter((h) =>
      h.symbol.includes(searchValue)
    );

    const sortDirection = sortColumn.asc ? "asc" : "desc";
    const sortedHoldings = _.orderBy(
      filteredHoldings,
      sortColumn.path,
      sortDirection
    );

    const pagedHoldings = _.slice(
      sortedHoldings,
      currentPage * pageSize,
      (currentPage + 1) * pageSize
    );

    const pageCount = Math.ceil(filteredHoldings.length / pageSize);
    return { sortedHoldings, pagedHoldings, pageCount };
  };

  const { sortedHoldings, pagedHoldings, pageCount } = filterHoldings();

  return (
    <React.Fragment>
      <div className="component">
        <div className="main-container">
          <div className="component-title">
            <h1>holdings</h1>
          </div>
          <div className="table-container">
            {sortedHoldings.length !== 0 ? (
              <HoldingsTable
                onSort={handleSort}
                sortColumn={sortColumn}
                holdings={pagedHoldings}
              />
            ) : (
              <p className="main-text">no holdings to display</p>
            )}
            <div className="pagination-box">
              {pageCount > 1 && (
                <Pagination
                  pageCount={pageCount}
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                />
              )}
            </div>
          </div>
        </div>

        <div className="side-container">
          <div className="corner-button"></div>
          <div className="sidebar">
            <div className="sidebar-content">
              <SearchBox
                onInputChange={handleSearchInputChange}
                upperCaseInput={true}
                upperCaseOutput={true}
                placeholder="[ filter by symbol ]"
                searboxClass="searchbox"
                id="trade-search"
              />
              <div className="switch-box-container">
                <HoldingsTypeSwitch
                  type={currentToggle}
                  onSwitch={handleSwitchCurrentHoldings}
                  title="current holdings"
                />
                <HoldingsTypeSwitch
                  type={pastToggle}
                  onSwitch={handleSwitchPastHoldings}
                  title="past holdings"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Holdings;
