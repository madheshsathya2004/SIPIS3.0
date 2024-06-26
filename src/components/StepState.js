import React, { useState } from "react";

const StepState = ({ year, handleGo, setStateOption }) => {
  const [stateOption, setLocalStateOption] = useState("");
  const [level, setLevel] = useState("");

  const handleStateChange = (e) => {
    const value = e.target.value;
    setLocalStateOption(value);
    setStateOption(value);
  };

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const handleViewMap = () => {
    handleGo(null, stateOption, level);
  };

  return (
    <div className="form-group">
      <label htmlFor="stateOption">Select an Option</label>
      <select
        className="form-control custom-select"
        id="stateOption"
        onChange={handleStateChange}
      >
        {year === "1991" ? (
          <>
            <option value="">Select an Option</option>
            <option value="Total">Total</option>
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </>
        ) : (
          <>
            <option value="">Select an Option</option>
            <option value="district">District</option>
            <option value="subdistrict">Subdistrict</option>
          </>
        )}
      </select>
      {stateOption === "Rural" && year === "1991" && (
        <div className="form-group mt-3">
          <label htmlFor="level">Select a Sub-Level</label>
          <select
            className="form-control custom-select"
            id="level"
            onChange={handleLevelChange}
          >
            <option value="">Select a Sub-Level</option>
            <option value="District_Rural">District_Rural</option>
            <option value="Subdistrict">Subdistrict</option>
            
          </select>
        </div>
      )}
      {stateOption === "Miscellaneous" && year === "1991" && (
        <div className="form-group mt-3">
          <label htmlFor="level">Select an option</label>
          <select
            className="form-control custom-select"
            id="level"
            onChange={handleLevelChange}
          >
            <option value="">Select an option</option>
            <option value="Water Bodies">Water Bodies</option>
            <option value="Sex Ratio General">Sex Ratio General</option>
            <option value="Sex Ratio Under 6">Sex Ratio Under 6</option>
            <option value="Roads">Roads</option>
            <option value="Rivers">Rivers</option>
            <option value="Railways">Railways</option>
            <option value="Literacy">Literacy</option>
            <option value="Irrigation">Irrigation</option>
            <option value="Fertility">Fertility</option>
            <option value="Elevation">Elevation</option>
          </select>
        </div>
      )}
      {stateOption && (
        <button className="btn btn-primary mt-3" onClick={handleViewMap}>
          View Map
        </button>
      )}
    </div>
  );
};

export default StepState;
