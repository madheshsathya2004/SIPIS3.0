import React, { useState, useEffect } from 'react';
import { getSubdistricts, getDistricts } from '../utils/loadData';

const StepSubdistrict = ({ year, handleGo }) => {
  const [district, setDistrict] = useState('');
  const [subdistrict, setSubdistrict] = useState('');
  const [subdistricts, setSubdistricts] = useState([]);

  useEffect(() => {
    if (district) {
      setSubdistricts(getSubdistricts(year, district));
      setSubdistrict(''); // Reset subdistrict when district changes
    }
  }, [district, year]);

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  const handleSubdistrictChange = (e) => {
    setSubdistrict(e.target.value);
  };

  const handleViewMap = () => {
    handleGo(district, subdistrict);
  };

  return (
    <div className="form-group">
      <label htmlFor="district" className="form-label">Select a District</label>
      <select className="form-control custom-select" id="district" value={district} onChange={handleDistrictChange}>
        <option value="">Select a District</option>
        {getDistricts(year).map(district => (
          <option key={district} value={district}>{district}</option>
        ))}
      </select>
      {district && (
        <>
          <label htmlFor="subdistrict" className="form-label">Select a Subdistrict(Village Level)</label>
          <select className="form-control custom-select" id="subdistrict" value={subdistrict} onChange={handleSubdistrictChange}>
            <option value="">Select a Subdistrict</option>
            {subdistricts.map((subdistrict, index) => (
              <option key={index} value={subdistrict}>{subdistrict}</option>
            ))}
          </select>
        </>
      )}
      {subdistrict && (
        <button className="btn btn-primary mt-3" onClick={handleViewMap}>
          View Map
        </button>
      )}
    </div>
  );
};

export default StepSubdistrict;
