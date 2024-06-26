import React, { useState } from 'react';

const StepOne = ({ setYear, setSelection, handleNext }) => {
  const [year, setLocalYear] = useState('');

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setLocalYear(selectedYear);
    setYear(selectedYear);
    setSelection(''); // Reset selection when year changes
  };

  const handleSelectionChange = (e) => {
    setSelection(e.target.value);
    handleNext();
  };

  return (
    <div className="form-group">
      <label htmlFor="year">Select a Year</label>
      <select className="form-control custom-select" id="year" value={year} onChange={handleYearChange}>
        <option value="">Select a Year</option>
        <option value="1991">1991</option>
        <option value="2001">2001</option>
        <option value="2011">2011</option>
      </select>
      {year && (
        <div className="form-group mt-3">
          <label htmlFor="selection">Select an Option</label>
          <select className="form-control custom-select" id="selection" onChange={handleSelectionChange}>
            <option value="">Select an Option</option>
            <option value="state">State</option>
            <option value="district">District</option>
            <option value="subdistrict">Subdistrict</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default StepOne;
