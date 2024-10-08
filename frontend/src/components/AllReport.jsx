import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar';
import '../styles/Report.css'; // Importing the external CSS for better separation

const AllReport = () => {
  const { reportId } = useParams();
  const [reports, setReports] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/report`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        setReports(response.data.data);
      } catch (error) {
        setErrorMessage('Error fetching reports');
      }
    };

    fetchReports();
  }, [reportId]);

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  if (reports.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="report-page">
    <Navbar />
      <h1 className="report-title">Quiz Reports</h1>
      <div className="report-container">
        {reports.map((report, index) => (
          <div key={report._id} className="report-card">
            <h2>Report {index + 1}</h2>
            <p>Score: {report.score}/{report.total}</p>
            <p>Percentage: {report.percentage}%</p>
            <p>Result: {report.result}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReport;
