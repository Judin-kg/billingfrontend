import React, { useState, useEffect } from "react";
import "./Billing.css";
import logo from "./assets/logo.png";
import { useNavigate } from "react-router-dom";

const API_URL = "https://billingserver.vercel.app/api/quotations";

const Billing = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([{ description: "", price: "" }]);
  const [billTo, setBillTo] = useState("");
  const [quotationNo, setQuotationNo] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Generate quotation number & date
  useEffect(() => {
    const randomNo = "RJA-" + Math.floor(100000 + Math.random() * 900000);
    setQuotationNo(randomNo);
    setDate(new Date().toLocaleDateString("en-GB"));
  }, []);

  const addItem = () => {
    setItems([...items, { description: "", price: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0),
    0
  );

  // Save quotation + print
  const printBill = async () => {
    if (!billTo.trim()) {
      alert("Please enter Bill To / Client details");
      return;
    }

    setLoading(true);

    const quotationData = {
      quotationNo,
      billTo,
      items,
      total: Number(totalAmount),
      date
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quotationData)
      });

      if (!res.ok) throw new Error("Failed to save quotation");

      window.print();
    } catch (err) {
      alert("Error saving quotation");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="billing-wrapper">

      {/* TOP BAR */}
      <div className="top-bar">
        <button className="admin-btn" onClick={() => navigate("/admin")}>
          Admin
        </button>
      </div>

      {/* TERMS */}
      <div className="terms">
        <strong>Terms & Conditions:</strong>
        <ul>
          <li>50% advance payment is required to initiate the project.</li>
          <li>Remaining 50% is payable before final delivery.</li>
          <li>Payments must follow the agreed proposal schedule.</li>
          <li>Late payments attract 5% weekly penalty.</li>
        </ul>
      </div>

      {/* BILL */}
      <div className="bill-container">

        {/* HEADER */}
        <div className="bill-header">
          <img src={logo} alt="RJ Atlas Digital AI" />
          <div className="company-info">
            <h2>RJ Atlas Digital AI</h2>
            <p>Professional Digital & AI Solutions</p>
            <p><strong>Quotation No:</strong> {quotationNo}</p>
            <p><strong>Date:</strong> {date}</p>
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

        {/* ITEMS */}
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

        <button className="add-btn" onClick={addItem}>
          + Add Item
        </button>

        {/* TOTAL */}
        <div className="total-box">
          <h3>Grand Total: ₹ {totalAmount.toFixed(2)}</h3>
        </div>

        {/* PRINT */}
        <button className="print-btn" onClick={printBill} disabled={loading}>
          {loading ? "Saving..." : "Print / Save as PDF"}
        </button>

      </div>
    </div>
  );
};

export default Billing;
