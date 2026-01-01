import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let quotations = []; // MEMORY STORAGE (temporary)

/* ROOT */
app.get("/", (req, res) => {
  res.send("RJ Atlas Digital AI Billing Backend (Vercel)");
});

/* GET */
app.get("/api/quotations", (req, res) => {
  res.json(quotations);
});

/* POST */
app.post("/api/quotations", (req, res) => {
  const data = {
    quotationNo: req.body.quotationNo,
    billTo: req.body.billTo,
    items: req.body.items || [],
    total: Number(req.body.total || 0),
    date: req.body.date
  };

  quotations.push(data);
  res.status(201).json({ message: "Saved (memory only)" });
});

/* DELETE */
app.delete("/api/quotations/:quotationNo", (req, res) => {
  quotations = quotations.filter(
    q => q.quotationNo !== req.params.quotationNo
  );
  res.json({ message: "Deleted" });
});

/* UPDATE */
app.put("/api/quotations/:quotationNo", (req, res) => {
  quotations = quotations.map(q =>
    q.quotationNo === req.params.quotationNo
      ? { ...q, ...req.body }
      : q
  );
  res.json({ message: "Updated" });
});

export default app;
