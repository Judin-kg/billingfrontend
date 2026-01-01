import React, { useEffect, useState } from "react";
import "./Admin.css";

const Admin = () => {
  const [quotations, setQuotations] = useState([]);
  const [search, setSearch] = useState("");
  const [editNo, setEditNo] = useState(null);
  const [editData, setEditData] = useState({ billTo: "", total: "" });

  const loadData = () => {
    fetch("https://billingserver.vercel.app/api/quotations")
      .then(res => res.json())
      .then(data => setQuotations(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteQuotation = async (quotationNo) => {
    if (!window.confirm("Delete this quotation?")) return;

    await fetch(
      `https://billingserver.vercel.app/api/quotations/${quotationNo}`,
      { method: "DELETE" }
    );

    loadData();
  };

  const startEdit = (q) => {
    setEditNo(q.quotationNo);
    setEditData({
      billTo: q.billTo || "",
      total: q.total || ""
    });
  };

  const saveEdit = async (quotationNo) => {
    await fetch(
      `https://billingserver.vercel.app/api/quotations/${quotationNo}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billTo: editData.billTo,
          total: Number(editData.total)
        })
      }
    );

    setEditNo(null);
    loadData();
  };

  const filtered = quotations.filter(q =>
    (q.quotationNo || "").toLowerCase().includes(search.toLowerCase()) ||
    (q.billTo || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-wrapper">
      <h2>Admin Dashboard – Quotations</h2>

      <input
        className="filter-input"
        placeholder="Search quotation or client"
        value={search}
        onChange={e => setSearch(e.target.value)}
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
          {filtered.length ? filtered.map((q, i) => (
            <tr key={i}>
              <td>{q.quotationNo}</td>

              <td>
                {editNo === q.quotationNo ? (
                  <input
                    value={editData.billTo}
                    onChange={e =>
                      setEditData({ ...editData, billTo: e.target.value })
                    }
                  />
                ) : q.billTo}
              </td>

              <td>{q.date}</td>

              <td>
                {editNo === q.quotationNo ? (
                  <input
                    type="number"
                    value={editData.total}
                    onChange={e =>
                      setEditData({ ...editData, total: e.target.value })
                    }
                  />
                ) : (
                  `₹ ${Number(q.total || 0).toFixed(2)}`
                )}
              </td>

              <td>
                {editNo === q.quotationNo ? (
                  <button onClick={() => saveEdit(q.quotationNo)}>
                    Save
                  </button>
                ) : (
                  <button onClick={() => startEdit(q)}>
                    Edit
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() => deleteQuotation(q.quotationNo)}
                >
                  Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" align="center">No quotations</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
