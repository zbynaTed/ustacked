import React, { useState, useEffect } from "react";

import StocksTable from "./stocks/StocksTable";

import Modal from "./common/Modal";
import StockForm from "./stocks/StockForm";
import SearchBox from "./common/SearchBox";
// import SidebarFooter from "./sidebar/SidebarFooter";

import * as stockServices from "../services/api/stocks";

function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function fetchStocks() {
      try {
        const { data } = await stockServices.getStocks();
        setStocks(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchStocks();
  }, []);

  const handleSearchInputChange = (input) => {
    setSearchValue(input);
  };

  const handleCreate = async (stockData) => {
    await stockServices.createStock(stockData);
    setStocks([...stocks, stockData]);
  };

  const handleDelete = async (stockId) => {
    await stockServices.deleteStock(stockId);
    const updatedStocks = stocks.filter((s) => s.id !== stockId);
    setStocks([...updatedStocks]);
  };

  const handleEdit = async (stockData) => {
    await stockServices.editStock(stockData);
    let updatedStock = stocks.filter((s) => s.id === stockData.id);
    const index = stocks.indexOf(updatedStock);
    let updatedStocks = stocks;
    updatedStocks[index] = stockData;

    setStocks([...updatedStocks]);
  };

  const filterStocks = () => {
    let filteredStocks = [];
    let matchedStock = null;
    let exactMatch = null;

    if (searchValue) {
      filteredStocks = stocks.filter(
        (s) =>
          s.name.toLowerCase().search(searchValue.toLowerCase()) >= 0 ||
          s.symbol.toLowerCase().search(searchValue.toLowerCase()) >= 0
      );
      matchedStock = stocks.filter(
        (s) => s.symbol.toLowerCase() === searchValue.toLowerCase()
      );
      exactMatch = matchedStock ? matchedStock[0] : null;
    }
    return { filteredStocks, exactMatch };
  };

  const { filteredStocks, exactMatch } = filterStocks();

  return (
    <React.Fragment>
      <div className="component">
        <div className="main-container">
          <div className="component-title">
            <h1>stock database</h1>
          </div>
          <div className="table-container">
            {searchValue &&
              ((filteredStocks.length > 0 && filteredStocks.length < 11) ||
              exactMatch ? (
                <div className="table-container">
                  <div className="stocks">
                    <StocksTable
                      stocks={
                        filteredStocks.length < 11
                          ? filteredStocks
                          : [exactMatch]
                      }
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      exactMatch={exactMatch}
                    />
                    {filteredStocks.length > 10 && (
                      <p className="main-text">
                        More than 10 other results found, specify your query.
                      </p>
                    )}
                  </div>
                </div>
              ) : filteredStocks.length === 0 ? (
                <p className="main-text">No result match your query.</p>
              ) : (
                <p className="main-text">
                  More than 10 results found, please specify your query.
                </p>
              ))}
            {!searchValue && (
              <p className="main-text">
                use searchbox to look up for stocks in the database
              </p>
            )}
          </div>
        </div>

        <div className="side-container">
          <div className="corner-button">
            <Modal
              modalBtnType="icon"
              modalBtnClass="fa fa-plus-circle modal-btn"
              modalId="addStock-stocks"
              title="create new stock"
              footer=""
              content={
                <StockForm
                  btnLabel="Confirm"
                  actionType="add"
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
                placeholder="[ search stocks ]"
                searboxClass="searchbox"
                id="stock-search"
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Stocks;
