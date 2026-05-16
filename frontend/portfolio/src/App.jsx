import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "./pages/Home.jsx";
import DomainHealthChecker from "./pages/DomainHealthChecker.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "20px", display: "flex", gap: "15px" }}>
        <Link to="/">Home</Link>
        <Link to="/tools/domain-health">Domain Health Tool</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools/domain-health" element={<DomainHealthChecker />} />
      </Routes>
    </BrowserRouter>
  );
}