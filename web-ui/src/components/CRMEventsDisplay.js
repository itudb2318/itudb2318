// src/components/DataDisplay.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make a request to the Flask backend
    axios.get('http://localhost:5000/api/data/get_crm_events')
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
          <li key={item.date_received}>
            <span>{item.product}</span>
            <span>{item.sub_product}</span>
            <span>{item.issue}</span>
            <span>{item.sub_issue}</span>
            <span>{item.consumer_complaint_narrative}</span>
            <span>{item.tags}</span>
            <span>{item.consumer_consent_provided}</span>
            <span>{item.submitted_via}</span>
            <span>{item.date_sent_to_company}</span>
            <span>{item.company_response_to_consumer}</span>
            <span>{item.timely_response}</span>
            <span>{item.consumer_disputed}</span>
            <span>{item.complaint_id}</span>
            <span>{item.client_id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;