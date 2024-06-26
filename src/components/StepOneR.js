// src/components/StepOneR.js

import React from 'react';

const StepOneR = ({ setYear, setSelection }) => {
  const handleYearChange = (e) => {
    setYear(e.target.value);
    setSelection(''); // Reset selection when year changes
  };

  const handleSelectionChange = (e) => {
    setSelection(e.target.value);
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="year">Select a Year</label>
        <select className="form-control custom-select" id="year" onChange={handleYearChange}>
          <option value="">Select a Year</option>
          <option value="1991">1991</option>
          <option value="2001">2001</option>
          <option value="2011">2011</option>
        </select>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="selection">Select a Region</label>
        <select className="form-control custom-select" id="selection" onChange={handleSelectionChange}>
          <option value="">Select an Option</option>
          <option value="state">State</option>
          <option value="district">District</option>
          <option value="subdistrict">Subdistrict</option>
        </select>
      </div>
    </div>
  );
};

export default StepOneR;
