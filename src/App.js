import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Billing from "./Billing";
import Admin from "./Admin";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Billing />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
