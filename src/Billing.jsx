import React, { useState, useEffect } from "react";
import "./Billing.css";
import logo from "../src/assets/logo.png";
import { useNavigate } from "react-router-dom";


const Billing = () => {
    
const navigate = useNavigate();
  const [items, setItems] = useState([{ description: "", price: "" }]);
  const [billTo, setBillTo] = useState("");
  const [quotationNo, setQuotationNo] = useState("");

  // Generate random quotation number
  useEffect(() => {
    const randomNo = "RJA-" + Math.floor(100000 + Math.random() * 900000);
    setQuotationNo(randomNo);
  }, []);

  const addItem = () => {
    setItems([...items, { description: "", price: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0),
    0
  );
const printBill = () => {
  const quotationData = {
    quotationNo,
    billTo,
    total: totalAmount,
    date: new Date().toLocaleDateString()
  };

  const existing = JSON.parse(localStorage.getItem("quotations")) || [];
  localStorage.setItem(
    "quotations",
    JSON.stringify([...existing, quotationData])
  );

  window.print();
};


  return (
    <div className="billing-wrapper">

      {/* TOP BAR */}
      <div className="top-bar">
       
<button className="admin-btn" onClick={() => navigate("/admin")}>
  Admin
</button>
      </div>

      {/* TERMS & CONDITIONS */}
      <div className="terms">
        <strong>Terms & Conditions:</strong>
        <ul>
          <li>A deposit of 50% of the total project cost is required to initiate the project.</li>
          <li>The remaining 50% is due upon project completion and before final delivery.</li>
          <li>Payments must be made as per the agreed-upon project schedule.</li>
          <li>Late payments may incur a late fee of 5% per week on the outstanding balance.</li>
        </ul>
      </div>

      {/* BILL CONTAINER */}
      <div className="bill-container">

        {/* HEADER */}
        <div className="bill-header">
          <img src={logo} alt="RJ Atlas Digital AI" />
          <div className="company-info">
            <h2>RJ Atlas Digital AI</h2>
            <p>Professional Digital & AI Solutions</p>
            <p><strong>Quotation No:</strong> {quotationNo}</p>
          </div>
        </div>

        {/* BILL TO */}
        <div className="bill-to">
          <label><strong>Bill To / Company / Address</strong></label>
          <textarea
            placeholder="Enter client name, company name and address"
            value={billTo}
            onChange={(e) => setBillTo(e.target.value)}
          />
        </div>

        {/* ITEMS TABLE */}
        <table className="bill-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    placeholder="Service / Product"
                    value={item.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) =>
                      handleChange(index, "price", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="add-btn" onClick={addItem}>+ Add Item</button>

        {/* TOTAL */}
        <div className="total-box">
          <h3>Grand Total: ₹ {totalAmount.toFixed(2)}</h3>
        </div>

        {/* PRINT BUTTON */}
        <button className="print-btn" onClick={printBill}>
          Print / Save as PDF
        </button>

      </div>
    </div>
  );
};

export default Billing;
