import { BrowserRouter, Routes, Route } from "react-router-dom";
import Billing from "./Billing";
import Admin from "./Admin";
import ViewPDF from "./ViewPDF";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Billing />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/view-pdf" element={<ViewPDF />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
