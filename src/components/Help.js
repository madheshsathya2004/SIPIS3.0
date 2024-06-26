import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { parse } from 'csv-parse/browser/esm';
import './Help.css';

const Help = () => {
  const [data1991, setData1991] = useState([]);
  const [data2001, setData2001] = useState([]);
  const [data2011, setData2011] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1991 = await fetch('/data/1991.csv');
        const response2001 = await fetch('/data/2001.csv');
        const response2011 = await fetch('/data/2011.csv');

        const data1991Text = await response1991.text();
        const data2001Text = await response2001.text();
        const data2011Text = await response2011.text();

        parse(data1991Text, {
          columns: true,
          skip_empty_lines: true,
          trim: true,
        }, (err, result) => {
          if (err) {
            console.error('Error parsing 1991 data:', err);
            return;
          }
          console.log('1991 Data:', result);
          setData1991(result);
        });

        parse(data2001Text, {
          columns: true,
          skip_empty_lines: true,
          trim: true,
        }, (err, result) => {
          if (err) {
            console.error('Error parsing 2001 data:', err);
            return;
          }
          console.log('2001 Data:', result);
          setData2001(result);
        });

        parse(data2011Text, {
          columns: true,
          skip_empty_lines: true,
          trim: true,
        }, (err, result) => {
          if (err) {
            console.error('Error parsing 2011 data:', err);
            return;
          }
          console.log('2011 Data:', result);
          setData2011(result);
        });
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };

    fetchData();
  }, []);

  const renderTable = (data, year) => {
    if (!data || data.length === 0) {
      return <p>No data available</p>;
    }
    console.log(`Render Data ${year}:`, data); // Debug log

    const getField = (item) => {
      console.log('Item:', item); // Debug log for individual items
      return item['Attribute (field)'] || item['Attribute Field'] || item['Attribute(field)'] || item['Atttribute(field)'];
    };

    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Attribute Field</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.Code}</td>
              <td>{getField(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <Container className="help-container">
      <h1 className="my-4">Help</h1>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Header>1991</Card.Header>
            <Card.Body>
              <div className="scrollable-container">
                {renderTable(data1991, 1991)}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>2001</Card.Header>
            <Card.Body>
              <div className="scrollable-container">
                {renderTable(data2001, 2001)}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>2011</Card.Header>
            <Card.Body>
              <div className="scrollable-container">
                {renderTable(data2011, 2011)}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Help;
