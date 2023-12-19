// src/components/DataDisplay.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make a request to the Flask backend
    axios.get('http://localhost:5000/api/data/get_completedcard')
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
          <li key={item.card_id}>
            <span>{item.disp_id}</span>
            <span>{item.type}</span>
            <span>{item.year}</span>
            <span>{item.month}</span>
            <span>{item.day}</span>
            <span>{item.fulldate}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;