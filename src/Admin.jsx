import React, { useEffect, useState } from "react";
import "./Admin.css";

const API_URL = "https://billingserver.vercel.app/api/quotations";

const Admin = () => {
  const [quotations, setQuotations] = useState([]);
  const [search, setSearch] = useState("");

  const fetchQuotations = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setQuotations(data);
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const deleteQuotation = async (id) => {
    if (!window.confirm("Delete this quotation?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchQuotations();
  };

  const viewPDF = (q) => {
    localStorage.setItem("viewQuotation", JSON.stringify(q));
    window.open("/view-pdf", "_blank");
  };

  const filtered = quotations.filter(q =>
    q.quotationNo.toLowerCase().includes(search.toLowerCase()) ||
    q.billTo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-wrapper">
      <h2>Admin Dashboard – Quotations</h2>

      <input
        className="filter-input"
        placeholder="Search quotation or client"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="admin-table">
        <thead>
          <tr>
            <th>Quotation No</th>
            <th>Client</th>
            <th>Date</th>
            <th>Total (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((q) => (
            <tr key={q._id}>
              <td>{q.quotationNo}</td>
              <td>{q.billTo}</td>
              <td>{q.date}</td>
              <td>₹ {Number(q.total).toFixed(2)}</td>
              <td>
                <button onClick={() => viewPDF(q)}>View PDF</button>
                <button onClick={() => deleteQuotation(q._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
