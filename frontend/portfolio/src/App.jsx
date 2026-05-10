import { useState } from "react";

const API = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const [domain, setDomain] = useState("");
  const [data, setData] = useState(null);

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

  const getStatusColor = (status) => {
    switch (status) {
      case "Healthy":
        return "#16a34a";
      case "Warning":
        return "#f59e0b";
      case "Critical":
        return "#dc2626";
      default:
        return "#6b7280";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#16a34a";
    if (score >= 50) return "#f59e0b";
    return "#dc2626";
  };

  return (
    <div style={{ 
      padding: "30px", 
      fontFamily:"sans-serif", 
      maxWidth: "1000px", 
      margin: "0 auto",
      background: "#f9fafb"
      }}>

        <h1 style={{ marginBottom: "10px" }}>
          Domain Health Toolkit
        </h1>

        <div style={{ 
          marginBottom: "25px",
          display: "flex",
          gap: "10px"
        }}>

          <input 
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain name"
            style = {{ 
              padding: "8px", 
              width: "300px",
              border: "1px solid #ccc",
              borderRadius: "6px" 
            }}
          />

          <button onClick={handleCheckDomain} style={{ 
            marginLeft: "10px", 
            padding: "8px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
            }}>
            Check Domain
          </button>

        </div>

        {data?.health && data?.dns && data?.spf &&(
          <div>

            <div style={{ 
              background: "white",
              padding: "20px",
              borderRadius: "20px",
              marginBottom: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.5)"
              }}>
                <h2 style={{ margin: 0 }}>{data.domain}</h2>
                <div style={{ marginTop: "15px"}}>
                  <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: "999px",
                      background: getStatusColor(data.health.status),
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}>
                      {data.health.status}
                    </span>

                    <span style={{ fontSize: "22px", fontWeight: "bold" }}>
                      {data.health.score}/100
                    </span>
                  </div>

                  <div style={{
                    marginTop: "10px",
                    height: "10px",
                    width: "100%",
                    background: "#e5e7eb",
                    borderRadius: "999px",
                    overflow: "hidden"
                  }}>
                    <div style= {{
                      height: "100%",
                      width: `${data.health.score}%`,
                      background: getScoreColor(data.health.score),
                      transition: "width 0.3s ease"
                    }}
                    />

                    </div>
                  </div>
                </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px"
        }}>

          <div style={{
            background: "white",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.5)"
          }}>
            <h3>Health</h3>

            <p><b>Status:</b> {data.health.status}</p>
            <p><b>Score:</b> {data.health.score}</p>

            {data.health.warnings?.length > 0 && (
              <ul>
                {data.health.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            )}
          </div>

          <div style={{
            background: "white",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.5)"
          }}>
            <h3>SPF</h3>

            <p><b>Has SPF:</b> {data.spf.HasSpf ? "Yes" : "No"}</p>
            <p><b>Severity:</b> {data.spf.severity}</p>
            <p><b>Record:</b> {data.spf.spfRecord || "None"}</p>
          </div>

          <div style={{
            gridColumn: "span 2",
            background: "white",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.5)"
          }}>
            <h3>DNS Records</h3>

            <p><b>A Records:</b></p>
            <ul>
              {data.dns.a.map((r, i) => <li key={i}>{r}</li>)}
            </ul>

            <p><b>MX Records:</b></p>
            <ul>
              {data.dns.mx.map((r, i) => <li key={i}>{r}</li>)}
            </ul>

            <p><b>TXT Records:</b></p>
            <ul>
              {data.dns.txt.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
      </div>
      </div>
      )}
      </div>
  );
}