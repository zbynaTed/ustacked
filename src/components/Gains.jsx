import React, { useEffect, useState } from "react";
import _ from "lodash";

import SearchBox from "./common/SearchBox";
import GainsTable from "./gains/GainsTable";
import SidebarFooter from "./sidebar/SidebarFooter";
import Pagination from "./common/Pagination";

import { getCurrentHoldings } from "../services/api/holdings";
import calculateGainsParameters from "../accessories/functions/gains";

function Gains({ user }) {
  const [gains, setGains] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortColumn, setSortColumn] = useState({
    path: "symbol",
    asc: true,
  });

  useEffect(() => {
    async function fetchGains() {
      const { data } = await getCurrentHoldings(user.id);
      const gains = calculateGainsParameters(data);
      setGains(gains);
    }
    fetchGains();
  }, [user.id]);

  const handleSearchInputChange = (input) => {
    setSearchValue(input);
  };

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const filterGains = () => {
    const filteredGains = gains.filter((g) => g.symbol.includes(searchValue));

    const sortDirection = sortColumn.asc ? "asc" : "desc";
    const sortedGains = _.orderBy(
      filteredGains,
      sortColumn.path,
      sortDirection
    );

    const pagedGains = _.slice(
      sortedGains,
      currentPage * pageSize,
      (currentPage + 1) * pageSize
    );

    const pageCount = Math.ceil(filteredGains.length / pageSize);
    return { sortedGains, pagedGains, pageCount };
  };

  const { sortedGains, pagedGains, pageCount } = filterGains();

  return (
    <React.Fragment>
      <div className="component">
        <div className="main-container">
          <div className="component-title">
            <h1>realized gains</h1>
          </div>
          <div className="table-container">
            {sortedGains.length !== 0 ? (
              <GainsTable
                gains={pagedGains}
                onSort={handleSort}
                sortColumn={sortColumn}
              />
            ) : (
              <p className="main-text">No realized gains yet.</p>
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
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Gains;
