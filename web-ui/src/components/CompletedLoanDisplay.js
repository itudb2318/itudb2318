// src/components/DataDisplay.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make a request to the Flask backend
    axios.get('http://localhost:5000/api/data/get_completedloan')
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
          <li key={item.loan_id}>
            <span>{item.account_id}</span>
            <span>{item.amount}</span>
            <span>{item.duration}</span>
            <span>{item.payments}</span>
            <span>{item.status}</span>
            <span>{item.year}</span>
            <span>{item.month}</span>
            <span>{item.day}</span>
            <span>{item.fulldate}</span>
            <span>{item.location}</span>
            <span>{item.purpose}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;