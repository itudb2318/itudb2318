// src/components/DataDisplay.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make a request to the Flask backend
    axios.get('http://localhost:5000/api/data/get_completedacct')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Data Display</h1>
      <ul>
        {data.map(item => (
          <li key={item.account_id}>
            <span>{item.account_id}</span>
            <span>{item.district_id}</span>
            <span>{item.frequency}</span>
            <span>{item.parseddate}</span>
            <span>{item.year}</span>
            <span>{item.month}</span>
            <span>{item.day}</span>
            {/* Add more spans for additional columns */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;