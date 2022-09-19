import React, { useState, useEffect } from "react";
import _ from "lodash";

import Modal from "./common/Modal";
import TradesTable from "./trades/TradesTable";
import TradeForm from "./trades/TradeForm";
import SearchBox from "./common/SearchBox";
import Pagination from "./common/Pagination";
import TradeTypeSelection from "./trades/TradeTypeSelection";

import { createTrade, deleteTrade, editTrade } from "../services/api/trades";
// import SidebarFooter from "./sidebar/SidebarFooter";

import tradeTypes from "../accessories/constants/tradeTypes";
import calculators from "../accessories/functions/trades";

function Trades({ user }) {
  const [trades, setTrades] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [pageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortColumn, setSortColumn] = useState({
    path: "tradeDate",
    asc: false,
  });
  const [selectedTradeType, setSelectedTradeType] = useState(0);

  useEffect(() => {
    async function fetchTrades() {
      const trades = await calculators.getUserTrades(user.id);
      setTrades(trades);
    }
    fetchTrades();
  }, [user.id]);

  const handleCreate = async (tradeData) => {
    await createTrade(tradeData);
    const trades = await calculators.getUserTrades(user.id);
    setTrades(trades);
  };

  const handleDelete = async (tradeId) => {
    await deleteTrade(tradeId);
    const updatedTrades = trades.filter((t) => t.id !== tradeId);
    setTrades([...updatedTrades]);
  };

  const handleEdit = async (tradeId, tradeData) => {
    await editTrade(tradeId, tradeData);
    const trades = await calculators.getUserTrades(user.id);
    setTrades(trades);
  };

  const handleSearchInputChange = (input) => {
    setCurrentPage(0);
    setSearchValue(input);
  };

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handleRadioButtonChange = (option) => {
    setCurrentPage(0);
    setSelectedTradeType(option);
  };

  const filterTrades = () => {
    let filteredTrades = trades.filter(
      (t) => t.symbol && t.symbol.includes(searchValue)
    );
    const tradeType = tradeTypes.filter((t) => t.id === selectedTradeType)[0]
      .value;

    filteredTrades = selectedTradeType
      ? filteredTrades.filter((t) => t.buy === tradeType)
      : filteredTrades;

    const sortDirection = sortColumn.asc ? "asc" : "desc";
    const sortedTrades = _.orderBy(
      filteredTrades,
      sortColumn.path,
      sortDirection
    );

    const pagedTrades = _.slice(
      sortedTrades,
      currentPage * pageSize,
      (currentPage + 1) * pageSize
    );

    const pageCount = Math.ceil(filteredTrades.length / pageSize);
    return { sortedTrades, pagedTrades, pageCount };
  };

  const { sortedTrades, pagedTrades, pageCount } = filterTrades();
  return (
    <React.Fragment>
      <div className="component">
        <div className="main-container">
          <div className="component-title">
            <h1>trades</h1>
          </div>
          <div className="table-container">
            {sortedTrades.length !== 0 ? (
              <TradesTable
                onSort={handleSort}
                sortColumn={sortColumn}
                trades={pagedTrades}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ) : (
              <p className="main-text">no trades to display</p>
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
          <div className="corner-button">
            <Modal
              modalBtnType="icon"
              modalBtnClass="fa fa-plus-circle modal-btn"
              modalId="addTrade"
              title="add trade"
              footer=""
              content={
                <TradeForm
                  title="add new trade"
                  btnLabel="Confirm"
                  actionType="createTrade"
                  onCreate={handleCreate}
                />
              }
            />
          </div>
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
              <TradeTypeSelection
                selectedTradeType={selectedTradeType}
                onRadioButtonChange={handleRadioButtonChange}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Trades;
