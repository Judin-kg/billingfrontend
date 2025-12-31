import React, { useEffect, useState } from "react";
import "./Admin.css";

const Admin = () => {
  const [quotations, setQuotations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("quotations")) || [];
    setQuotations(stored);
  }, []);

  const filteredQuotations = quotations.filter(q =>
    q.quotationNo.toLowerCase().includes(search.toLowerCase()) ||
    q.billTo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-wrapper">
      <h2>Admin Dashboard – Quotations</h2>

      {/* FILTER */}
      <input
        type="text"
        className="filter-input"
        placeholder="Search by Quotation No or Client Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Quotation No</th>
            <th>Client / Company</th>
            <th>Date</th>
            <th>Total (₹)</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuotations.length > 0 ? (
            filteredQuotations.map((q, index) => (
              <tr key={index}>
                <td>{q.quotationNo}</td>
                <td>{q.billTo || "—"}</td>
                <td>{q.date}</td>
                <td>₹ {q.total.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No quotations found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
