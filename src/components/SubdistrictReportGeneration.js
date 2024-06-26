import React, { useState, useEffect, useRef } from 'react';
import { getSubdistricts, getDistricts } from '../utils/loadData';
import Papa from 'papaparse';
import { parse } from 'csv-parse/browser/esm';
import { saveAs } from 'file-saver';
import QueryComponent from './QueryComponent';
import { Modal, Button } from 'react-bootstrap';
import './QueryComponent.css';

const SubdistrictReportGeneration = ({ year }) => {
  const [district, setDistrict] = useState('');
  const [subdistrict, setSubdistrict] = useState('');
  const [subdistricts, setSubdistricts] = useState([]);
  const [csvData, setCsvData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    if (district) {
      setSubdistricts(getSubdistricts(year, district));
      setSubdistrict(''); // Reset subdistrict when district changes
    }
  }, [district, year]);

  const handleDownload = () => {
    if (subdistrict !== '') {
      const encodedDistrict = encodeURIComponent(district);
      const encodedSubdistrict = encodeURIComponent(subdistrict);
      const path = `/Report/${year}/SubDistrict/${encodedDistrict}/${encodedSubdistrict}.csv`;
      console.log('Download Path:', path);

      const link = document.createElement('a');
      link.href = path;
      link.setAttribute('download', `${subdistrict}.csv`);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleView = () => {
    if (subdistrict !== '') {
      const encodedDistrict = encodeURIComponent(district);
      const encodedSubdistrict = encodeURIComponent(subdistrict);
      const path = `/Report/${year}/SubDistrict/${encodedDistrict}/${encodedSubdistrict}.csv`;
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
    }
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
          <label htmlFor="subdistrict">Select a Subdistrict</label>
          <select className="form-control" id="subdistrict" onChange={(e) => setSubdistrict(e.target.value)}>
            <option value="">Select a Subdistrict</option>
            {subdistricts.map((subdistrict) => (
              <option key={subdistrict} value={subdistrict}>{subdistrict}</option>
            ))}
          </select>
        </>
      )}
      {subdistrict && (
        <div>
          <button className="btn btn-primary mt-3 me-2" onClick={handleDownload}>Download Subdistrict Report</button>
          <button className="btn btn-secondary mt-3" onClick={handleView}>View Subdistrict Report</button>
        </div>
      )}
      {filteredData && (
        <div className="mt-4">
          <h3>Subdistrict Data</h3>
          <QueryComponent 
            applyFilters={applyQueryFilters} 
            revertFeatures={revertFeatures} 
            year={year} 
            selection="subdistrict" 
            selectedDistrict={district} 
            selectedSubdistrict={subdistrict} 
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="btn btn-success mb-3" onClick={handlePrint}>Print Search Results</button>
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

export default SubdistrictReportGeneration;
