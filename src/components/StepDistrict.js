import React, { useState, useEffect } from 'react';
import { getDistricts } from '../utils/loadData';

const StepDistrict = ({ year, handleGo }) => {
  const [district, setDistrict] = useState('');
  const [option, setOption] = useState('');

  useEffect(() => {
    if (district) {
      setOption(''); // Reset option when district changes
    }
  }, [district]);

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const handleViewMap = () => {
    handleGo(district, option);
  };

  return (
    <div className="form-group">
      <label htmlFor="district">Select a District</label>
      <select className="form-control custom-select" id="district" value={district} onChange={handleDistrictChange}>
        <option value="">Select a District</option>
        {getDistricts(year).map((district) => (
          <option key={district} value={district}>{district}</option>
        ))}
      </select>
      {district && (
        <>
          <label htmlFor="option">Select an Option</label>
          <select className="form-control custom-select" id="option" value={option} onChange={handleOptionChange}>
            {year === '1991' ? (
              <>
                <option value="">Select an Option</option>
                <option value="subdistrict">Subdistrict</option>
                <option value="village">Village</option>
                <option value="urban">Urban</option>
              </>
            ) : (
              <>
                <option value="">Select an Option</option>
                <option value="subdistrict">Subdistrict</option>
                <option value="village">Village</option>
              </>
            )}
          </select>
        </>
      )}
      {option && (
        <button className="btn btn-primary mt-3" onClick={handleViewMap}>
          View Map
        </button>
      )}
    </div>
  );
};

export default StepDistrict;
