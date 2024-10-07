// pages/SuccessPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/successPage.module.css";

const SuccessPage = () => {
  const [latestFormData, setLatestFormData] = useState(null);

  useEffect(() => {
    axios
      .get(" https://api-308154634208.us-east1.run.app/api/submissions")
      .then((response) => {
        const submissions = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        if (submissions.length > 0) {
          const sortedSubmissions = submissions.sort(
            (a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted)
          );
          setLatestFormData(sortedSubmissions[0]);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className={styles.successPage}>
      <div className={styles.card}>
        <h1>Form Submission Success!</h1>
        <h2>Latest Submitted Form Data:</h2>
        {latestFormData ? (
          <div>
            <p>Name: {latestFormData.name}</p>
            <p>Email: {latestFormData.email}</p>
            <p>Phone: {latestFormData.phone}</p>
            <p>Age: {latestFormData.age}</p>
            <p>Address: {latestFormData.address}</p>
            <p>
              Date Submitted:{" "}
              {new Date(latestFormData.dateSubmitted).toLocaleString()}
            </p>
          </div>
        ) : (
          <p>No submissions available.</p>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
