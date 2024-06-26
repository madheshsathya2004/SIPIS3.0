import React, { useState, useEffect } from 'react';
import StepOne from './components/StepOne';
import StepState from './components/StepState';
import StepDistrict from './components/StepDistrict';
import StepSubdistrict from './components/StepSubdistrict';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MapComponent.css';

const MapComponent = () => {
  const [step, setStep] = useState(1);
  const [year, setYear] = useState('');
  const [selection, setSelection] = useState('');
  const [dataPath, setDataPath] = useState('');
  const [selectedArea, setSelectedArea] = useState('Tamil Nadu');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSubdistrict, setSelectedSubdistrict] = useState('');
  const [stateOption, setStateOption] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    let area = year ? `${year} - Tamil Nadu` : 'Tamil Nadu';
    if (selection === 'state') {
      if (stateOption === 'Rural' && year === '1991') {
        area += ` - ${stateOption} - ${level}`;
      } else if (stateOption === 'Miscellaneous' && year === '1991') {
        area += ` - ${stateOption} - ${level}`;
      } else {
        area += ` - ${stateOption}`;
      }
    } else if (selection === 'district') {
      if (selectedSubdistrict === 'subdistrict') {
        area += ` - ${selectedDistrict} - Subdistrict level`;
      } else if (selectedSubdistrict === 'village') {
        area += ` - ${selectedDistrict} - Village level`;
      } else if (selectedSubdistrict === 'urban') {
        area += ` - ${selectedDistrict} - Urban level`;
      }
    } else if (selection === 'subdistrict') {
      area += ` - ${selectedDistrict} - ${selectedSubdistrict} - Village level`;
    }
    setSelectedArea(area);
  }, [year, selection, selectedDistrict, selectedSubdistrict, stateOption, level]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleGo = (district, subdistrict, level) => {
    let path = '';
    setSelectedDistrict(district);
    setSelectedSubdistrict(subdistrict);
    setLevel(level);

    if (year === '1991') {
      if (selection === 'state') {
        if (subdistrict === 'Rural') {
          path = `/Maps/1991/State/Rural/${level}/index.html`;
        } else if (subdistrict === 'Miscellaneous') {
          path = `/Maps/1991/State/Miscellaneous/${level}/index.html`;
        } else {
          path = `/Maps/1991/State/${subdistrict}/index.html`;
        }
      } else if (selection === 'district') {
        if (subdistrict === 'subdistrict') {
          path = `/Maps/1991/District/Subdistrict/${district}/index.html`;
        } else if (subdistrict === 'village') {
          path = `/Maps/1991/District/Village/${district}/index.html`;
        } else {
          path = `/Maps/1991/District/Urban/${district}/index.html`;
        }
      } else if (selection === 'subdistrict') {
        path = `/Maps/1991/SubDistrict/${district}/${subdistrict}/index.html`;
      }
    } else {
      if (selection === 'state') {
        path = `/Maps/${year}/State/${subdistrict}/index.html`;
      } else if (selection === 'district') {
        if (subdistrict === 'subdistrict') {
          path = `/Maps/${year}/District/Subdistrict/${district}/index.html`;
        } else if (subdistrict === 'village') {
          path = `/Maps/${year}/District/Village/${district}/index.html`;
        }
      } else if (selection === 'subdistrict') {
        path = `/Maps/${year}/SubDistrict/${district}/${subdistrict}/index.html`;
      }
    }

    console.log('View Path:', path);
    setDataPath(path);
    setStep(3);
  };

  return (
    <div className="map-container">
      <div className="header">
        <h1 className="title">Choose Geographical Area</h1>
        <div className="selected-area">{selectedArea}</div>
      </div>
      <div className="map-content">
        <div className="sidebar">
          <div className="sidebar-content">
            {step >= 1 && <StepOne setYear={setYear} setSelection={setSelection} handleNext={handleNext} />}
            {step >= 2 && selection === 'state' && <StepState year={year} handleGo={handleGo} setStateOption={setStateOption} />}
            {step >= 2 && selection === 'district' && (
              <StepDistrict year={year} handleGo={handleGo} />
            )}
            {step >= 2 && selection === 'subdistrict' && (
              <StepSubdistrict year={year} handleGo={handleGo} />
            )}
          </div>
        </div>
        <div className="map-viewer">
          {step === 3 && dataPath && (
            <div>
              <iframe src={dataPath} width="700px" height="600px" title="Map Viewer"></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
