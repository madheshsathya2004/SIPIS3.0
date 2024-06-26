import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { parse } from 'csv-parse/browser/esm';
import { saveAs } from 'file-saver';
import QueryComponent from './QueryComponent';
import { Modal, Button } from 'react-bootstrap';
import './QueryComponent.css';

const StateReportGeneration = ({ year }) => {
  const [selection, setSelection] = useState('');
  const [level, setLevel] = useState('');
  const [csvData, setCsvData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const printRef = useRef();

  const handleDownload = () => {
    if (selection !== '') {
      let path = '';
      if (year === '1991') {
        if (selection === 'Total') {
          path = `/Report/1991/State/Total.csv`;
        } else if (selection === 'Urban') {
          path = `/Report/1991/State/Urban.csv`;
        } else if (selection === 'Rural') {
          if (level === 'District_Rural') {
            path = `/Report/1991/State/Rural/Districts_Rural.csv`;
          } else if (level === 'Subdistrict') {
            path = `/Report/1991/State/Rural/Subdistrict.csv`;
          }
        }
      } else {
        path = `/Report/${year}/State/${selection}.csv`;
      }

      console.log('Download Path:', path);
      const link = document.createElement('a');
      link.href = path;
      link.setAttribute('download', `${selection}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleView = () => {
    if (selection !== '') {
      let path = '';
      if (year === '1991') {
        if (selection === 'Total') {
          path = `/Report/1991/State/Total.csv`;
        } else if (selection === 'Urban') {
          path = `/Report/1991/State/Urban.csv`;
        } else if (selection === 'Rural') {
          if (level === 'District_Rural') {
            path = `/Report/1991/State/Rural/Districts_Rural.csv`;
          } else if (level === 'Subdistrict') {
            path = `/Report/1991/State/Rural/Subdistrict.csv`;
          }
        }
      } else {
        path = `/Report/${year}/State/${selection}.csv`;
      }

      console.log('View Path:', path);
      fetch(path)
        .then(response => response.text())
        .then(text => {
          console.log('Raw Data Length:', text.length);  // Log length of raw data
          console.log('Raw Data:', text);

          if (!text || text.trim() === '') {
            throw new Error('No data available in the CSV file.');
          }

          parse(text, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
          }, (err, output) => {
            if (err) {
              console.error('Parsing Error:', err);
              throw new Error('Error parsing the CSV file.');
            }
            if (!output.length) {
              throw new Error('No data available in the CSV file.');
            }
            console.log('Parsed Data:', output);
            setCsvData(output);
            setFilteredData(output);
          });
        })
        .catch(error => {
          console.error('Error fetching the file:', error);
          alert('Error fetching the file: ' + error);
        });
    } else {
      console.log('No selection made.');
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
      <label htmlFor="selection">Select a Region</label>
      <select className="form-control" id="selection" onChange={(e) => setSelection(e.target.value)}>
        {year === '1991' ? (
          <>
            <option value="">Select a Region</option>
            <option value="Total">Total</option>
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
          </>
        ) : (
          <>
            <option value="">Select a Level</option>
            <option value="District">District</option>
            <option value="Subdistrict">Subdistrict</option>
          </>
        )}
      </select>
      {selection === 'Rural' && year === '1991' && (
        <div className="mt-3">
          <label htmlFor="level">Select Level</label>
          <select className="form-control" id="level" onChange={(e) => setLevel(e.target.value)}>
            <option value="">Select Level</option>
            <option value="District_Rural">District_Rural</option>
            <option value="Subdistrict">Subdistrict</option>
          </select>
        </div>
      )}
      {selection && (
        <div>
          <button className="btn btn-primary mt-3 me-2" onClick={handleDownload}>
            Download {selection.charAt(0).toUpperCase() + selection.slice(1)} Report
          </button>
          <button className="btn btn-secondary mt-3 me-2" onClick={handleView}>
            View {selection.charAt(0).toUpperCase() + selection.slice(1)} Report
          </button>
        </div>
      )}
      {filteredData && (
        <div className="mt-4">
          <h3>State Data</h3>
          <QueryComponent 
            applyFilters={applyQueryFilters} 
            revertFeatures={revertFeatures} 
            year={year} 
            selection={selection} 
            level={level}
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

export default StateReportGeneration;
