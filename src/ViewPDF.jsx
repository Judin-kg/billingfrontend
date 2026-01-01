import React from "react";
import "./Billing.css";
import logo from "../src/assets/logo.png";

const ViewPDF = () => {
  const q = JSON.parse(localStorage.getItem("viewQuotation"));

  if (!q) return <h3>No data found</h3>;

  return (
    <div className="bill-container">
      <div className="bill-header">
        <img src={logo} alt="RJ Atlas Digital AI" />
        <div>
          <h2>RJ Atlas Digital AI</h2>
          <p><strong>Quotation No:</strong> {q.quotationNo}</p>
          <p><strong>Date:</strong> {q.date}</p>
        </div>
      </div>

      <div className="bill-to">
        <strong>Bill To:</strong>
        <p>{q.billTo}</p>
      </div>

      <table className="bill-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {q.items.map((i, idx) => (
            <tr key={idx}>
              <td>{i.description}</td>
              <td>{i.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Grand Total: ₹ {q.total.toFixed(2)}</h3>

      <button onClick={() => window.print()}>
        Print / Save PDF
      </button>
    </div>
  );
};

export default ViewPDF;
