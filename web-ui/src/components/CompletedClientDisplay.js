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
          <li key={item.client_id}>
            <span>{item.sex}</span>
            <span>{item.fulldate}</span>
            <span>{item.day}</span>
            <span>{item.month}</span>
            <span>{item.year}</span>
            <span>{item.age}</span>
            <span>{item.social}</span>
            <span>{item.first}</span>
            <span>{item.middle}</span>
            <span>{item.last}</span>
            <span>{item.phone}</span>
            <span>{item.email}</span>
            <span>{item.address_1}</span>
            <span>{item.address_2}</span>
            <span>{item.city}</span>
            <span>{item.state}</span>
            <span>{item.zipcode}</span>
            <span>{item.district_id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;