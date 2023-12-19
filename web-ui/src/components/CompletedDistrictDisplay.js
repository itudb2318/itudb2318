// src/components/DataDisplay.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make a request to the Flask backend
    axios.get('http://localhost:5000/api/data/get_completeddistrict')
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
          <li key={item.district_id}>
            <span>{item.city}</span>
            <span>{item.state_name}</span>
            <span>{item.state_abbrev}</span>
            <span>{item.region}</span>
            <span>{item.division}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;