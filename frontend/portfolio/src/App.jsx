import { useState } from "react";

const API = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const [domain, setDomain] = useState("");
  const [data, setData] = useState(null);

  console.log("APP RENDERED");

  const handleCheckDomain = async () => {
    console.log("Button Clicked");
    try {
      const response = await fetch(`${API}/api/domainhealth?domain=${encodeURIComponent(domain)}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching domain health data:", error);
    }
  }
  return (
    <div style={{ padding: "20px", fontFamily:"sans-serif" }}>
      <h1>Domain Health Toolkit</h1>

      <input 
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Enter domain name"
      />

      <button onClick={handleCheckDomain}>
        Check Domain
      </button>

      {data && (
        <pre style={{ marginTop: "20px" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )

}
