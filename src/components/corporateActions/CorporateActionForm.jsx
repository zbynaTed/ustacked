import React, { useState, useEffect } from "react";

import Input from "../common/form/Input";
import Label from "../common/form/Label";
import Select from "../common/form/Select";

import * as caService from "../../services/api/corporateActions";
import corporateActionFormCompomentsTemplate from "../../templates/corporateActionForm";

import dateFormats from "../../accessories/formats/dates";

function CorporateActionForm({ ca, onCreate, onEdit, actionType, btnLabel }) {
  const [type, setType] = useState({
    value: ca ? ca.caId : 1,
    error: false,
  });
  const [stock, setStock] = useState({
    value: ca ? ca.symbol : "",
    id: ca ? ca.stockId : undefined,
    companyId: ca ? ca.companyId : undefined,
    error: ca ? false : true,
  });
  const [effectiveDate, setEffectiveDate] = useState({
    value:
      ca && ca.effectiveDate
        ? dateFormats.formDateFormat(ca.effectiveDate)
        : "",
    error: ca ? false : true,
  });
  const [recordDate, setRecordDate] = useState({
    value:
      ca && ca.recordDate ? dateFormats.formDateFormat(ca.effectiveDate) : "",
    error: ca ? false : true,
  });
  const [numerator, setNumerator] = useState({
    value: ca && ca.numerator ? ca.numerator : "",
    error: ca ? false : true,
  });
  const [denominator, setDenominator] = useState({
    value: ca && ca.denominator ? ca.denominator : "",
    error: ca ? false : true,
  });
  const [amount, setAmount] = useState({
    value: ca && ca.amount ? ca.amount : "",
    error: ca ? false : true,
  });
  const [oldSymbol, setOldSymbol] = useState({
    value: ca && ca.oldSymbol ? ca.oldSymbol : "",
    error: ca ? false : true,
  });
  const [newSymbol, setNewSymbol] = useState({
    value: ca && ca.newSymbol ? ca.newSymbol : "",
    error: ca ? false : true,
  });
  // const [spunCompany, setSpunCompany] = useState({
  //   value: ca && ca.spunOffCompanyId ? ca.spunOffCompanyId : "",
  //   error: ca ? false : true,
  // });
  const [caTypes, setCaTypes] = useState([]);

  const dependencies = {
    1: [{ effectiveDate }, { numerator }, { denominator }],
    2: [{ effectiveDate }, { oldSymbol }, { newSymbol }],
    3: [{ effectiveDate }, { amount }],
    // 4: [{ effectiveDate }, { numerator }, { denominator }, { spunCompany }],
  };

  useEffect(() => {
    async function fetchAllCorporateActions() {
      const { data: caTypes } = await caService.getCorporateActionTypes();
      setCaTypes(caTypes);
    }
    fetchAllCorporateActions();
  }, []);

  const handleSubmit = async () => {
    const dependentComponents = dependencies[type.value];
    let newCa = {
      caId: type.value,
      stockId: stock.id,
      companyId: stock.companyId,
    };
    for (let d of dependentComponents) {
      newCa[`${Object.keys(d)[0]}`] = Object.values(d)[0].value;
    }

    if (actionType === "createCorporateAction") {
      await onCreate(newCa);
    } else if (actionType === "editCorporateAction") {
      await onEdit(ca.id, newCa);
    }
  };

  const successfulValidation = () => {
    let dependentComponents = [];
    let dependants = dependencies[type.value];
    for (let d of dependants) {
      dependentComponents.push(Object.values(d)[0]);
    }
    const compoments = [type, stock, ...dependentComponents];
    return compoments.every((c) => c.error === false);
  };

  let corporateActionFormCompoments = corporateActionFormCompomentsTemplate(
    caTypes,
    type,
    setType,
    stock,
    setStock,
    effectiveDate,
    setEffectiveDate,
    recordDate,
    setRecordDate,
    numerator,
    setNumerator,
    denominator,
    setDenominator,
    oldSymbol,
    setOldSymbol,
    newSymbol,
    setNewSymbol,
    amount,
    setAmount
    // spunCompany,
    // setSpunCompany
  );

  const mainComponent = corporateActionFormCompoments[0];
  corporateActionFormCompoments.shift();

  return (
    <div className="modal-form-container">
      <form onSubmit={handleSubmit} action="" className="modal-form-body">
        <Label htmlFor={mainComponent.id} value={mainComponent.name} />
        <Select
          name={mainComponent.name}
          id={mainComponent.id}
          value={mainComponent.value}
          setValue={mainComponent.setValue}
          options={caTypes}
        />

        {Object.keys(mainComponent.dependencies).includes(`${type.value}`)
          ? corporateActionFormCompoments.map((c) =>
              mainComponent.dependencies[`${type.value}`].includes(c.id) ? (
                <React.Fragment key={c.id}>
                  <Label htmlFor={c.id} value={c.name} />
                  <Input
                    type={c.type}
                    name={c.name}
                    id={c.id}
                    value={c.value}
                    setValue={c.setValue}
                    upperCaseInput={c.upperCase}
                    validateInput={c.validation}
                  />
                  {c.value.error && (
                    <p className="form-error-message">{c.value.error}</p>
                  )}
                </React.Fragment>
              ) : null
            )
          : null}
        <button
          className="btn btn-submit"
          disabled={successfulValidation() ? "" : "disabled"}
          type="submit"
        >
          {btnLabel}
        </button>
      </form>
    </div>
  );
}

export default CorporateActionForm;
