// src/ReportGeneration.js

import React, { useState } from 'react';
import StepOneR from './components/StepOneR';
import StateReportGeneration from './components/StateReportGeneration';
import DistrictReportGeneration from './components/DistrictReportGeneration';
import SubdistrictReportGeneration from './components/SubdistrictReportGeneration';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReportGeneration.css';

const ReportGeneration = () => {
  const [year, setYear] = useState('');
  const [selection, setSelection] = useState('');

  return (
    <div className="report-container">
      <h1 className="my-4">Select Region for Analysis</h1>
      <StepOneR setYear={setYear} setSelection={setSelection} />
      {selection === 'state' && <StateReportGeneration year={year} />}
      {selection === 'district' && <DistrictReportGeneration year={year} />}
      {selection === 'subdistrict' && <SubdistrictReportGeneration year={year} />}
    </div>
  );
};

export default ReportGeneration;
