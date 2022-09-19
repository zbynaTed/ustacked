import React, { useState, useEffect } from "react";
import _ from "lodash";

import CorporateActionsTable from "./corporateActions/CorporateActionsTable";
import CorporateActionForm from "./corporateActions/CorporateActionForm";
import Pagination from "./common/Pagination";
import SearchBox from "./common/SearchBox";
import Modal from "./common/Modal";
import SidebarFooter from "./sidebar/SidebarFooter";
import CorporateActionTypeSelection from "./corporateActions/CorporateActionTypeSelection";

import * as ca from "../services/api/corporateActions";
import { getHoldingsHistory } from "../services/api/holdings";
import pickUserCorporateActions from "../accessories/functions/corporateActions";

function CorporateActions({ user }) {
  const [corporateActions, setCorporateActions] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [pageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortColumn, setSortColumn] = useState({
    path: "effectiveDate",
    asc: false,
  });
  const [selectedCorporateActionType, setSelectedCorporateActionType] =
    useState(0);

  useEffect(() => {
    async function fetchCorporateActions() {
      try {
        const { data: tradeList } = await getHoldingsHistory(user.id);
        const corporateActions = pickUserCorporateActions(tradeList);
        setCorporateActions(corporateActions);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchCorporateActions();
  }, [user.id]);

  const handleCreate = async (caData) => {
    await ca.createCorporateAction(caData);
    setCorporateActions([...corporateActions, caData]);
  };

  const handleDelete = async (caId) => {
    await ca.deleteCorporateAction(caId);
    const updatedCas = corporateActions.filter((c) => c.id !== caId);
    setCorporateActions([...updatedCas]);
  };

  const handleEdit = async (caId, caData) => {
    await ca.editCorporateAction(caId, caData);
    const updatedCas = corporateActions.filter((c) => c.id !== caId);
    setCorporateActions([...updatedCas], caData);
  };

  const handleSearchInputChange = (input) => {
    setCurrentPage(0);
    setSearchValue(input);
  };

  const handleSelectInputChange = (input) => {
    setCurrentPage(0);
    setSelectedCorporateActionType(input.value);
  };

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const filterCas = () => {
    let filteredCas = corporateActions.filter((c) =>
      c.symbol.includes(searchValue)
    );
    filteredCas =
      parseInt(selectedCorporateActionType) === 0
        ? filteredCas
        : selectedCorporateActionType
        ? filteredCas.filter(
            (t) => t.caId === parseInt(selectedCorporateActionType)
          )
        : filteredCas;

    const sortDirection = sortColumn.asc ? "asc" : "desc";
    const sortedCas = _.orderBy(filteredCas, sortColumn.path, sortDirection);

    const pagedCas = _.slice(
      sortedCas,
      currentPage * pageSize,
      (currentPage + 1) * pageSize
    );

    const pageCount = Math.ceil(filteredCas.length / pageSize);
    return { sortedCas, pagedCas, pageCount };
  };

  const { sortedCas, pagedCas, pageCount } = filterCas();

  return (
    <React.Fragment>
      <div className="component">
        <div className="main-container">
          <div className="component-title">
            <h1>corporate actions</h1>
          </div>
          <div className="table-container">
            {sortedCas.length !== 0 ? (
              <CorporateActionsTable
                onSort={handleSort}
                onEdit={handleEdit}
                onDelete={handleDelete}
                sortColumn={sortColumn}
                corporateActionsData={pagedCas}
                className="company-col ca-col"
              />
            ) : (
              <p className="main-text">No corporate actions to show.</p>
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
              modalId="createCa"
              title="add corporate action"
              footer=""
              content={
                <CorporateActionForm
                  btnLabel="Confirm"
                  actionType="createCorporateAction"
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
              <CorporateActionTypeSelection
                selectedCorporateActionType={selectedCorporateActionType}
                onSelectInputChange={handleSelectInputChange}
              />
              {/* <Modal
                modalBtnLabel="create"
                modalBtnClass="btn btn-modal"
                modalId="createCa"
                title="create corporate action"
                footer=""
                content={
                  <CorporateActionForm
                    btnLabel="Confirm"
                    actionType="createCorporateAction"
                  />
                }
              /> */}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="table-container">
        {sortedCas.length !== 0 ? (
          <CorporateActionsTable
            onSort={handleSort}
            onCreate={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
            sortColumn={sortColumn}
            corporateActionsData={pagedCas}
            className="company-col ca-col"
          />
        ) : (
          <p>No corporate actions to show.</p>
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
      <div className="side-container">
        <div className="side-main">
          <p className="title">corporate actions</p>
          <SearchBox
            onInputChange={handleSearchInputChange}
            upperCaseInput={true}
            upperCaseOutput={true}
            placeholder="[ filter by symbol ]"
            searboxClass="searchbox"
            id="trade-search"
          />
          <CorporateActionTypeSelection
            selectedCorporateActionType={selectedCorporateActionType}
            onSelectInputChange={handleSelectInputChange}
          />
          <Modal
            modalBtnLabel="create"
            modalBtnClass="btn btn-modal"
            modalId="createCa"
            title="create corporate action"
            footer=""
            content={
              <CorporateActionForm
                btnLabel="Confirm"
                actionType="createCorporateAction"
              />
            }
          />
        </div>
        <SidebarFooter
          count={corporateActions.length}
          title="corporate actions"
        />
      </div> */}
    </React.Fragment>
  );
}

export default CorporateActions;
