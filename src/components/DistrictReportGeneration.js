import React, { useState, useRef } from 'react';
import { getDistricts } from '../utils/loadData';
import Papa from 'papaparse';
import { parse } from 'csv-parse/browser/esm';
import { saveAs } from 'file-saver';
import QueryComponent from './QueryComponent';
import { Modal, Button } from 'react-bootstrap';
import './QueryComponent.css';

const DistrictReportGeneration = ({ year }) => {
  const [district, setDistrict] = useState('');
  const [option, setOption] = useState('');
  const [csvData, setCsvData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const printRef = useRef();

  const handleDownload = () => {
    let path = '';
    if (year === '1991') {
      if (option === 'subdistrict') {
        path = `/Report/1991/District/Subdistrict/${district}.csv`;
      } else if (option === 'village') {
        path = `/Report/1991/District/Village/${district}.csv`;
      } else if (option === 'urban') {
        path = `/Report/1991/District/Urban/${district}.csv`;
      }
    } else {
      if (option === 'subdistrict') {
        path = `/Report/${year}/District/SubDistrict/${district}.csv`;
      } else if (option === 'village') {
        path = `/Report/${year}/District/Village/${district}.csv`;
      }
    }

    console.log('Download Path:', path);
    const link = document.createElement('a');
    link.href = path;
    link.setAttribute('download', path.split('/').pop());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = () => {
    let path = '';
    if (year === '1991') {
      if (option === 'subdistrict') {
        path = `/Report/1991/District/Subdistrict/${district}.csv`;
      } else if (option === 'village') {
        path = `/Report/1991/District/Village/${district}.csv`;
      } else if (option === 'urban') {
        path = `/Report/1991/District/Urban/${district}.csv`;
      }
    } else {
      if (option === 'subdistrict') {
        path = `/Report/${year}/District/Subdistrict/${district}.csv`;
      } else if (option === 'village') {
        path = `/Report/${year}/District/Village/${district}.csv`;
      }
    }

    console.log('View Path:', path);
    fetch(path)
      .then(response => response.text())
      .then(data => {
        console.log('Raw Data:', data); // Add this log
        parse(data, { columns: true, skip_empty_lines: true }, (err, output) => {
          if (err) {
            console.error('Parsing Error:', err);
            throw new Error('Error parsing the CSV file.');
          }
          console.log('Parsed Data:', output); // Add this log
          setCsvData(output);
          setFilteredData(output);
        });
      })
      .catch(error => {
        console.error('Error fetching the file:', error);
        alert('Error fetching the file: ' + error);
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePrint = () => {
    const dataToPrint = applyFilters(filteredData);
    console.log('Data to Print:', dataToPrint); // Add this log
    const csv = Papa.unparse(dataToPrint);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'search_results.csv');
  };

  const applyFilters = (data) => {
    const filtered = data.filter((row) => {
      const matchesSearchTerm = Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchesSearchTerm;
    });
    console.log('Filtered Data:', filtered); // Add this log
    return filtered;
  };

  const applyQueryFilters = (filters) => {
    const filtered = csvData.filter((row) => {
      return Object.keys(filters).every((key) => {
        const { operator, value, value2 } = filters[key];
        const rowValue = parseFloat(row[key]);
        if (operator === '<') return rowValue < value;
        if (operator === '>') return rowValue > value;
        if (operator === '=') return rowValue === value;
        if (operator === 'between') return rowValue >= value && rowValue <= value2;
        return true;
      });
    });
    console.log('Query Filtered Data:', filtered); // Add this log
    if (filtered.length === 0) {
      setShowModal(true);
    } else {
      setFilteredData(filtered);
    }
  };

  const revertFeatures = () => {
    setFilteredData(csvData);
  };

  return (
    <div className="form-group">
      <label htmlFor="district">Select a District</label>
      <select className="form-control" id="district" onChange={(e) => setDistrict(e.target.value)}>
        <option value="">Select a District</option>
        {getDistricts(year).map(district => (
          <option key={district} value={district}>{district}</option>
        ))}
      </select>
      {district && (
        <>
          <label htmlFor="option">Select a Level</label>
          <select className="form-control" id="option" onChange={(e) => setOption(e.target.value)}>
            <option value="">Select a Level</option>
            <option value="subdistrict">Subdistrict</option>
            <option value="village">Village</option>
            {year === '1991' && <option value="urban">Urban</option>}
          </select>
        </>
      )}
      {option && (
        <div>
          <button className="btn btn-primary mt-3 me-2" onClick={handleDownload}>
            Download {option.charAt(0).toUpperCase() + option.slice(1)} Report
          </button>
          <button className="btn btn-secondary mt-3 me-2" onClick={handleView}>
            View {option.charAt(0).toUpperCase() + option.slice(1)} Report
          </button>
        </div>
      )}
      {filteredData && (
        <div className="mt-4">
          <h3>Data</h3>
          <QueryComponent 
            applyFilters={applyQueryFilters} 
            revertFeatures={revertFeatures} 
            year={year}
            selection="district" 
            selectedDistrict={district} 
            selectedSubdistrict={option}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="btn btn-success mb-3" onClick={handlePrint}>
            Print Search Results
          </button>
          <div ref={printRef}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  {Object.keys(filteredData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {applyFilters(filteredData).map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>No Data Available</Modal.Title>
        </Modal.Header>
        <Modal.Body>No data available for the applied filter.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DistrictReportGeneration;
